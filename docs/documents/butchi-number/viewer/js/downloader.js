// from http://openweb.co.jp/static/examples/fxos/sample2/

// Webページの読み込みが終わってから処理開始
document.addEventListener('DOMContentLoaded', function() {
    var $btnInstall = $('.btn-install');
    // mozApps APIがあるかどうかのチェック
    if (!navigator.mozApps) {
        return;
    }

    // (1) アプリケーションオブジェクトの取得
    var request = navigator.mozApps.getSelf();
    request.onsuccess = function() {
        // インストールされていない
        if (!request.result) {
            // インストールボタンを表示
            $btnInstall.show();
            // インストールボタンをクリックされた際の処理
            $btnInstall.on('click', function() {
                var thisUrl = location.href;
                // マニフェストファイルのURL
                var manifestUrl = thisUrl.substring(0, thisUrl.lastIndexOf('/')) + '/manifest.webapp';
                // (2) インストール
                var request = navigator.mozApps.install(manifestUrl);
                request.onsuccess = function() {
                    alert('アプリケーションはインストールされました');
                };
                request.onerror = function() {
                    alert('インストール処理中にエラーが発生しました:' + this.error.message);
                };
            });
        }
    };
    request.onerror = function() {
        alert('インストール状況のチェック中にエラーが発生しました:' + this.error.message);
    };
}, false);
