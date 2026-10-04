#!/usr/bin/env python3
"""Build enkripsi string Tebak Gambar (pola StringFog: XOR + base64).

Membaca game.src.js (source of truth), mengenkripsi:
  - 60 jawaban level
  - OLD_ANSWERS (24 jawaban urutan lama, untuk migrasi save)
  - SAVE_KEY (localStorage key)
  - 4 konfigurasi angka (COIN_REWARD, COST_REVEAL, COST_REMOVE, COST_SKIP)
lalu menyisipkan blok rekonstruksi key + fungsi decrypt D().

Output: game.build.js (siap di-minify via terser -> game.js).
Key di bawah HARUS sama persis dengan hasil rekonstruksi blok JS.
"""
import base64
import re
import sys

# Key final setelah rekonstruksi di JS: "TgEnc" + "_2026_" + "Xq7!"
KEY = "TgEnc" + "_2026_" + "Xq7!"


def enc(s: str) -> str:
    raw = s.encode("utf-8")
    x = bytes(b ^ ord(KEY[i % len(KEY)]) for i, b in enumerate(raw))
    return base64.b64encode(x).decode("ascii")


KEY_BLOCK = '''
/* Proteksi string: jawaban & konfigurasi terenkripsi (XOR+base64).
   Key dibangun dari beberapa bagian agar tidak tampil plaintext mentah. */
const _kA = atob("VGdFbmM=");
const _kB = String.fromCharCode(95, 50, 48, 50, 54, 95);
const _kC = "!7qX".split("").reverse().join("");
const _KEY = _kA + _kB + _kC;
function D(b) {
  const r = atob(b);
  let o = "";
  for (let i = 0; i < r.length; i++)
    o += String.fromCharCode(r.charCodeAt(i) ^ _KEY.charCodeAt(i % _KEY.length));
  return o;
}
'''


def main() -> None:
    try:
        src = open("game.src.js", encoding="utf-8").read()
    except FileNotFoundError:
        sys.exit("game.src.js tidak ditemukan — jalankan dari folder game/")

    # 1. jawaban level: { answer: "GAJAH", -> { answer: D("..."),
    def rep_answer(m):
        return '{ answer: D("%s"),' % enc(m.group(1))

    src, n_ans = re.subn(r'\{ answer: "([^"]+)",', rep_answer, src)
    assert n_ans == 60, "jawaban terenkripsi: %d, harus 60" % n_ans

    # 1b. OLD_ANSWERS (migrasi save lama): ["GAJAH", ...] -> [D("..."), ...]
    def rep_old(m):
        items = re.findall(r'"([^"]+)"', m.group(1))
        assert len(items) == 24, "OLD_ANSWERS: %d, harus 24" % len(items)
        return "const OLD_ANSWERS = [%s];" % ", ".join('D("%s")' % enc(x) for x in items)

    src, n_old = re.subn(r"const OLD_ANSWERS = \[([^\]]+)\];", rep_old, src)
    assert n_old == 1, "OLD_ANSWERS tidak ketemu"

    # 2. SAVE_KEY
    def rep_save(m):
        return 'const SAVE_KEY = D("%s");' % enc(m.group(1))

    src, n_save = re.subn(r'const SAVE_KEY = "([^"]+)";', rep_save, src)
    assert n_save == 1, "SAVE_KEY tidak ketemu"

    # 3. konfigurasi angka -> parseInt(D("..."), 10)
    for name in ["COIN_REWARD", "COST_REVEAL", "COST_REMOVE", "COST_SKIP"]:
        def rep_num(m, _n=name):
            return 'const %s = parseInt(D("%s"), 10);' % (_n, enc(m.group(1)))

        src, n = re.subn(r"const %s\s*= (\d+);" % name, rep_num, src)
        assert n == 1, "konstanta %s tidak ketemu" % name

    # 4. sisipkan blok key + decrypt setelah "use strict";
    assert '"use strict";' in src
    src = src.replace('"use strict";', '"use strict";' + KEY_BLOCK, 1)

    with open("game.build.js", "w", encoding="utf-8") as f:
        f.write(src)
    print("OK: 60 jawaban + OLD_ANSWERS + SAVE_KEY + 4 konfigurasi terenkripsi -> game.build.js")


if __name__ == "__main__":
    main()
