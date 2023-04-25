const query = document.querySelector(".mobile-nav-wrap")

function fadeInPage() {
    if (!window.AnimationEvent) return;
    var fader = document.getElementById('fader');
    fader.classList.add('fade-out');
}

function deviceType() {
    var userAgent = navigator.userAgent;
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
        document.getElementById('switchPage').remove();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    if (!window.AnimationEvent) return;
    var anchors = document.getElementsByTagName('a');

    for (var index = 0; index < anchors.length; index += 1) {
        if (anchors[index].hostname !== window.location.hostname ||
            anchors[index].pathname === window.location.pathname) {
            continue;
        }
        anchors[index].addEventListener('click', function (event) {
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