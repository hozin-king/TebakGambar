package com.hozinking.tebakgambar

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Bundle
import android.view.WindowManager
import android.webkit.WebView
import android.webkit.WebViewClient

/**
 * Tebak Gambar — WebView wrapper full offline.
 * Game HTML5 dimuat dari file lokal: android_asset/game/index.html
 * (disalin dari folder game/ saat build — lihat .github/workflows/build.yml)
 */
class MainActivity : Activity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        )

        webView = WebView(this)
        setContentView(webView)

        with(webView.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true      // untuk localStorage (save progress)
            mediaPlaybackRequiresUserGesture = false
            loadWithOverviewMode = true
            useWideViewPort = true
            builtInZoomControls = false
            displayZoomControls = false
            allowFileAccess = true
        }
        webView.webViewClient = WebViewClient()

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState)
        } else {
            webView.loadUrl("file:///android_asset/game/index.html")
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        // Delegasikan ke navigation stack di JS (window.__goBack):
        // true  = JS menangani (pindah layar / tutup popup) -> jangan exit
        // false = sudah di home -> boleh exit
        if (::webView.isInitialized) {
            webView.evaluateJavascript("window.__goBack()") { result ->
                if (result != "true") {
                    super.onBackPressed()
                }
            }
        } else {
            super.onBackPressed()
        }
    }
}
