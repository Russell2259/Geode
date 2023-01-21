const stockSW = '/uv/sw.js';
const swAllowedHostnames = ['localhost', '127.0.0.1'];

async function registerSW() {
    if (
        location.protocol !== 'https:' &&
        !swAllowedHostnames.includes(location.hostname)
    )
        throw new Error('Service workers cannot be registered without https.');

    if (!navigator.serviceWorker)
        throw new Error(`Your browser doesn't support service workers.`);

    await navigator.serviceWorker.register(stockSW, {
        scope: __uv$config.prefix,
    });
}

function search(input, template) {
    try {
        return new URL(input).toString();
    } catch (e) {

    }

    try {
        const url = new URL(`http://${input}`);
        if (url.hostname.includes('.')) return url.toString();
    } catch (e) {

    }

    return template.replace('%s', encodeURIComponent(input));
}