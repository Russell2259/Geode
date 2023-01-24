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
        const preventCloseSwitch = document.querySelector('#prevent-close_switch');
        const onePageSwitch = document.querySelector('#onepage_switch');

        aboutBlankSwitch.checked = settings.aboutblank;
        preventCloseSwitch.checked = settings.preventclose;
        onePageSwitch.checked = settings.onepage;
        aboutBlankRedirect.value = settings.aboutblank_redirect;
        tabTitle.value = settings.tabtitle;
        tabIcon.value = settings.tabicon;

        aboutBlankSwitch.addEventListener('change', (e) => {
            if (aboutBlankSwitch.checked ? false : true) {
                displayErr(aboutBlankRedirect, err[0], '');
                aboutBlankRedirect.style.border = '';
                aboutBlankRedirect.style.color = '';
                aboutBlankRedirect.value = '';
            }

            aboutBlankRedirect.disabled = aboutBlankSwitch.checked ? false : true;
        })

        aboutBlankRedirect.disabled = aboutBlankSwitch.checked ? false : true;

        saveBtn.addEventListener('click', (e) => {
            updatedSettings.aboutblank = aboutBlankSwitch.checked;
            updatedSettings.preventclose = preventCloseSwitch.checked;
            updatedSettings.tabtitle = tabTitle.value;
            updatedSettings.onepage = onePageSwitch.checked;

            if (isURL(aboutBlankRedirect.value) && aboutBlankSwitch.checked) {
                updatedSettings.aboutblank_redirect = aboutBlankRedirect.value;
            } else {
                if (aboutBlankSwitch.checked) {
                    if (!aboutBlankRedirect.value) {
                        displayErr(aboutBlankRedirect, err[0], '\nPlease enter a url');
                    } else {
                        displayErr(aboutBlankRedirect, err[0], '\nThat is not a valid URL');
                    }
                }

                updatedSettings.aboutblank_redirect = null;
            }

            if (isURL(tabIcon.value) || !tabIcon.value) {
                updatedSettings.tabicon = tabIcon.value;
            } else {
                displayErr(tabIcon, err[1], '\nThat is not a valid URL');
            }

            if (isURL(tabIcon.value) || !tabIcon.value) {
                if (isURL(aboutBlankRedirect.value) && aboutBlankSwitch.checked) {
                    localStorage.setItem('settings', JSON.stringify(updatedSettings));
                    location.reload();

                    if (aboutBlankSwitch.checked && window === window.parent) {
                        var win = window.open('', document.title);
                        toDataURL(`${window.location.protocol}//${window.location.host}/favicon.ico`, (data) => {
                            win.document.write(`<style>* {margin: 0px; overflow: hidden;} iframe {width: 100vw; height: 100vh;}</style><iframe sandbox="allow-scripts allow-popups allow-same-origin allow-popups-to-escape-sandbox allow-orientation-lock allow-forms allow-modals allow-orientation-lock allow-presentation allow-top-navigation allow-top-navigation" src="${window.location.href}" frameborder="0px"></iframe><script>var icon = document.querySelector("link[rel='icon']");if (!icon) {icon = document.createElement('link');icon.rel = 'icon';}; icon.setAttribute('href', '${data}'); document.head.appendChild(icon); document.title = '${document.title}'; onbeforeunload = (e) => {e.preventDefault(); return e.returnValue = 'no';}</script>`);
                        });
                        window.location.href = settings.aboutblank_redirect;
                    }
                } else {
                    if (!aboutBlankSwitch.checked) {
                        localStorage.setItem('settings', JSON.stringify(updatedSettings));
                        location.reload();

                        if (aboutBlankSwitch.checked && window === window.parent) {
                            var win = window.open('', document.title);
                            toDataURL(`${window.location.protocol}//${window.location.host}/favicon.ico`, (data) => {
                                win.document.write(`<style>* {margin: 0px; overflow: hidden;} iframe {width: 100vw; height: 100vh;}</style><iframe sandbox="allow-scripts allow-popups allow-same-origin allow-popups-to-escape-sandbox allow-orientation-lock allow-forms allow-modals allow-orientation-lock allow-presentation allow-top-navigation allow-top-navigation" src="${window.location.href}" frameborder="0px"></iframe><script>var icon = document.querySelector("link[rel='icon']");if (!icon) {icon = document.createElement('link');icon.rel = 'icon';}; icon.setAttribute('href', '${data}'); document.head.appendChild(icon); document.title = '${document.title}'; onbeforeunload = (e) => {e.preventDefault(); return e.returnValue = 'no';}</script>`);
                            });
                            window.location.href = settings.aboutblank_redirect;
                        }
                    }
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
        tabicon: null,
        tabcloakurl: null,
        preventclose: false,
        onepage: false
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

    if (settings.preventclose && !window === window.parent) {
        onbeforeunload = (e) => {
            e.preventDefault();
            return e.returnValue = 'no';
        }
    }

    if (settings.onepage && window === window.parent) {
        if (window.location.pathname === '/') {
            var framePath;

            if (sessionStorage.getItem('frame_page')) {
                framePath = sessionStorage.getItem('frame_page');
            } else if (document.referrer) {
                framePath = document.referrer;
            } else {
                framePath = '/';
            }

            console.log(document.referrer)

            document.body.innerHTML = `<iframe class="pageframe" frameborder="0" src="${framePath}"></iframe>`;
        } else {
            window.location.href = '/';
        }
    }
}