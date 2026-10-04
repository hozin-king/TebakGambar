#!/usr/bin/env python3
"""Enkripsi aset gambar Tebak Gambar (XOR, pola key ala StringFog).

Mengenkripsi setiap game/assets/levelXX.png -> game/assets/levelXX.bin.
Key final: "TgEnc" + "_2026_" + "Xq7!" (SAMA dengan key jawaban di build.py),
dibangun dari beberapa bagian agar tidak tampil plaintext mentah.

Runtime (game.src.js -> loadLevelImage) mem-fetch .bin, XOR-decrypt,
validasi magic PNG, lalu membuat Blob URL untuk <img>.

Jalankan dari folder game/:  python3 encrypt_assets.py
Idempotent: .bin selalu di-regenerate dari .png.
Urutan build lengkap:
  python3 encrypt_assets.py && python3 build.py && npx terser game.build.js -o game.js -c -m
"""
import os
import sys

_KA = bytes([84, 103, 69, 110, 99])    # "TgEnc"
_KB = bytes([95, 50, 48, 50, 54, 95])  # "_2026_"
_KC = bytes([88, 113, 55, 33])         # "Xq7!"
KEY = _KA + _KB + _KC

PNG_MAGIC = b"\x89PNG"


def xor_crypt(data: bytes) -> bytes:
    return bytes(b ^ KEY[i % len(KEY)] for i, b in enumerate(data))


def main() -> None:
    adir = "assets"
    if not os.path.isdir(adir):
        sys.exit("folder assets/ tidak ditemukan — jalankan dari folder game/")
    pngs = sorted(f for f in os.listdir(adir) if f.lower().endswith(".png"))
    if not pngs:
        sys.exit("tidak ada PNG di assets/")
    n = 0
    for f in pngs:
        src = os.path.join(adir, f)
        dst = os.path.join(adir, os.path.splitext(f)[0] + ".bin")
        with open(src, "rb") as fh:
            raw = fh.read()
        if raw[:4] != PNG_MAGIC:
            print("SKIP (bukan PNG):", f)
            continue
        with open(dst, "wb") as fh:
            fh.write(xor_crypt(raw))
        n += 1
    print("OK: %d gambar terenkripsi -> .bin (PNG asli tetap di repo, tidak ikut ke APK)" % n)


if __name__ == "__main__":
    main()
