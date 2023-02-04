/*
自動更新のチェックボックスにチェックをいれる
*/
function checkAutoScroll(){
    // 自動更新がオフになっているか判定するためにラベル要素の取得
    var autoScrollLabel = document.body.querySelector("[for='autoscroll']");
    // ラベル要素の使用クラス名にoffが含まれていたら自動更新は停止している
    if (autoScrollLabel.className.indexOf('off') != -1) {
        // 自動更新チェックボックスにチェックをいれる
        var element = document.getElementById('autoscroll');
        element.click()     
    }
}

/*
クリップボード完了時のポップアップHTMLを挿入
*/
function insertAlert(){
    const body = document.body;
    const html = '<p id="copy-alert">クリップボードにコピーしました</p>';
    body.insertAdjacentHTML('beforeend', html);
    
}

/*
参戦IDをボタンに変更し押下イベント追加
*/
function replaceTextToButton(){

    // 参戦IDが記載されたツイート要素を全取得
    var tweetBodyList = document.body.querySelectorAll("[class^='Tweet_body__']");
    
    for(var i = 0; i < tweetBodyList.length; i++){
        // ツイートのHTML取得
        var tweetBodyContent = tweetBodyList[i].innerHTML;
        // ツイート内容の参戦ID部分をボタンに要素変更
        var editedContent = tweetBodyContent.replace(/.*?([A-Z0-9]{8}) :参戦ID/, '<button value="$1" class="room-number">$1</button>');
        // 変更したHTMLを反映
        tweetBodyList[i].innerHTML = editedContent
    }

    // 参戦IDボタンを全取得
    var button = document.getElementsByClassName('room-number');

    for (i = 0; i < button.length; i++) {
        // 参戦IDボタンにイベント追加
        button[i].addEventListener("click", function() {
            // 参戦IDをクリップボードにコピー
            navigator.clipboard.writeText(this.value)
            // 完了メッセージのポップアップ表示
            var copyAlert = document.getElementById("copy-alert");
            copyAlert.style.display = "block";
            // ポップアップを一定時間後に自動で閉じる
            setTimeout(function(){
                var copyAlert = document.getElementById("copy-alert");
                copyAlert.style.display = "none";
            },2000)
        });
    }
}

insertAlert()
setInterval(function(){
    checkAutoScroll()
    replaceTextToButton()
}, 1000)