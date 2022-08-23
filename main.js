const query = document.querySelector(".mobile-nav-wrap")

function fadeInPage() {
    if (!window.AnimationEvent) return;
    var fader = document.getElementById('fader');
    fader.classList.add('fade-out');
}

function deviceType() {
    var ua = navigator.userAgent;
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        document.getElementById('subText').remove();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    if (!window.AnimationEvent) return;
    var anchors = document.getElementsByTagName('a');

    for (var idx = 0; idx < anchors.length; idx += 1) {
        if (anchors[idx].hostname !== window.location.hostname ||
            anchors[idx].pathname === window.location.pathname) {
            continue;
        }
        anchors[idx].addEventListener('click', function (event) {
            var fader = document.getElementById('fader'),
                anchor = event.currentTarget;

            var listener = function () {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            };
            fader.addEventListener('animationend', listener);

            event.preventDefault();
            fader.classList.add('fade-in');
        });
    }
});

window.addEventListener('pageshow', function (event) {
    if (!event.persisted) return
    var fader = document.getElementById('fader');
    fader.classList.remove('fade-in');
});

deviceType()
fadeInPage() //now we fade in the page