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

address.addEventListener('input', (e) => {
  if (!address.isURL(address.value) && address.value) {
    const options = {
      method: 'GET',
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '584c8a4891msh0fdd1285155e729p1a16c2jsnac8aa6f24523',
        'X-RapidAPI-Host': 'bing-web-search1.p.rapidapi.com'
      }
    };

    fetch(`https://bing-web-search1.p.rapidapi.com/search?q=${address.value}&mkt=en-us&setLang=en-us&count=5&safeSearch=Strict&textFormat=Raw&freshness=Week`, options)
      .then(bare => bare.json())
      .then(res => {
        console.log(response)
      })
      .catch(err => {
        throw new Error(err)
      });
  }
})