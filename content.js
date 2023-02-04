function checkAutoScroll(){
    var autoScrollLabel = document.body.querySelector("[for='autoscroll']");
    if (autoScrollLabel.className.indexOf('off') != -1) {
        var element = document.getElementById('autoscroll');
        element.click()     
    }
}

function insertAlert(){
    const body = document.body;
    const html = '<p id="copy-alert">クリップボードにコピーしました</p>';
    body.insertAdjacentHTML('beforeend', html);
    
}

function replaceTextToButton(){
    var tweetBodyList = document.body.querySelectorAll("[class^='Tweet_body__']");
    for(var i = 0; i < tweetBodyList.length; i++){
        var tweetBodyContent = tweetBodyList[i].innerHTML;
        var editedContent = tweetBodyContent.replace(/.*?([A-Z0-9]{8}) :参戦ID/, '<button value="$1" class="room-number">$1</button>');
        tweetBodyList[i].innerHTML = editedContent
    }

    var button = document.getElementsByClassName('room-number');

    for (i = 0; i < button.length; i++) {
        button[i].addEventListener("click", function() {
            navigator.clipboard.writeText(this.value)
            var copyAlert = document.getElementById("copy-alert");
            copyAlert.style.display = "block";
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