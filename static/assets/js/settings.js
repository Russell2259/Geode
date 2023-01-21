function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

function isURL(str) {
    var pattern = new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, 'i');
    return pattern.test(str);
}

function displayErr(el, errEl, errorMsg) {
    el.style.border = '1px solid rgba(255, 0, 0, 0.514)';

    errEl.innerText = errorMsg;
}

if (window.location.pathname === '/settings') {
    if (localStorage.getItem('settings')) {
        const settings = JSON.parse(localStorage.getItem('settings'));
        var updatedSettings = settings;

        const saveBtn = document.querySelector('#save');
        const err = document.querySelectorAll('.error');
        const aboutBlankSwitch = document.querySelector('#about-blank_switch');
        const aboutBlankRedirect = document.querySelector('#about-blank_redirect');
        const tabTitle = document.querySelector('#page-title');
        const tabIcon = document.querySelector('#page-icon');

        aboutBlankSwitch.checked = settings.aboutblank;
        aboutBlankRedirect.value = settings.aboutblank_redirect;
        tabTitle.value = settings.tabtitle;
        tabIcon.value = settings.tabicon;

        saveBtn.addEventListener('click', (e) => {
            updatedSettings.aboutblank = aboutBlankSwitch.checked;
            updatedSettings.tabtitle = tabTitle.value;

            if (isURL(aboutBlankRedirect.value) || !aboutBlankRedirect.value) {
                updatedSettings.aboutblank_redirect = aboutBlankRedirect.value;
            } else {
                displayErr(aboutBlankRedirect, err[0], '\nThat is not a valid URL');
            }

            if (isURL(tabIcon.value) || !tabIcon.value) {
                updatedSettings.tabicon = tabIcon.value;
            } else {
                displayErr(tabIcon, err[1], '\nThat is not a valid URL');
            }

            if (isURL(tabIcon.value) || !tabIcon.value && isURL(aboutBlankRedirect.value) || !aboutBlankRedirect.value) {
                localStorage.setItem('settings', JSON.stringify(updatedSettings));
                location.reload();

                if (aboutBlankSwitch.checked) {
                    var win = window.open('', document.title);
                    toDataURL(`${window.location.protocol}//${window.location.host}/favicon.ico`, (data) => {
                        win.document.write(`<style>* {margin: 0px; overflow: hidden;} iframe {width: 100vw; height: 100vh;}</style><iframe sandbox="allow-scripts allow-popups allow-same-origin allow-popups-to-escape-sandbox allow-orientation-lock allow-forms allow-modals allow-orientation-lock allow-presentation allow-top-navigation allow-top-navigation" src="${window.location.href}" frameborder="0px"></iframe><script>var icon = document.querySelector("link[rel='icon']");if (!icon) {icon = document.createElement('link');icon.rel = 'icon';}; icon.setAttribute('href', '${data}'); document.head.appendChild(icon); document.title = '${document.title}'; onbeforeunload = (e) => {e.preventDefault(); return e.returnValue = 'no';}</script>`);
                    });
                    window.location.href = settings.aboutblank_redirect;
                }
            }
        })
    }
}

if (!localStorage.getItem('settings')) {
    localStorage.setItem('settings', JSON.stringify({
        aboutblank: false,
        aboutblank_redirect: null,
        tabtitle: null,
        tabicon: null
    }))

    location.reload();
} else {
    const settings = JSON.parse(localStorage.getItem('settings'));

    if (settings.tabtitle) {
        document.title = settings.tabtitle;
    }

    if (settings.tabicon) {
        var icon = document.querySelector(`link[rel='icon']`);
        if (!icon) {
            icon = document.createElement('link');
            icon.rel = 'icon';
            icon.href = settings.tabIcon;
            document.head.appendChild(settings.tabicon);
        }

        icon.setAttribute('href', settings.tabicon);
    }
}