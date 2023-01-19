/*fetch('/assets/JSON/gs.json')
    .then((res) => res.json())
    .then((games) => {
    });*/

fetch('https://api.gh.retronetwork.ml/games')
    .then((res) => res.json())
    .then((games) => {
        for (let i = 0; i < games.length; i++) {
            const game = games[i];

            var gameEl = document.createElement('div');
            gameEl.classList = 'game';
            gameEl.title = game.name;
            gameEl.innerHTML = `<img src="${game.thumbnail}"/><p>${game.name}</p>`;
            document.querySelector('.games').appendChild(gameEl);
            gameEl.addEventListener('click', (e) => {
                alert(game.id);
            });
        }
    }).catch((e) => {
        console.log(e);
    })