const form = document.getElementById('uv-form');
const address = document.getElementById('uv-address');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (e) {
    throw new RegisterGeodeError(e);
  }

  const url = search(address.value, 'https://www.google.com/search?q=%s');
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});

address.addEventListener('input', (e) => {
  if (!isURL(address.value) && address.value) {
    const options = {
      method: 'GET',
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '584c8a4891msh0fdd1285155e729p1a16c2jsnac8aa6f24523',
        'X-RapidAPI-Host': 'bing-web-search1.p.rapidapi.com'
      }
    };
    
    /*fetch(`https://bing-web-search1.p.rapidapi.com/search?q=${adress.value}&mkt=en-us&safeSearch=Off&textFormat=Raw&freshness=Day`, options)
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < 5; i++) {
          const result = res.webPages.value[i];

          
        }
      })
      .catch(e => {
        throw new Error(e);
      });*/
  }
})