const form = document.getElementById('uv-form');
const address = document.getElementById('uv-address');
const error = document.getElementById('uv-error');
const errorCode = document.getElementById('uv-error-code');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    error.textContent = 'Failed to register service worker.';
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, 'https://www.google.com/search?q=%s');
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
