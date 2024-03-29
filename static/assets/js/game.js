const searchBar = document.querySelector('#search');
const gameDatabase = document.querySelector('.games');
const loader = document.querySelector('.ring-loader');
const gameFrameContainer = document.querySelector('.game-container');
const gameFrame = document.querySelector('.game-frame');
var loaded = false;
let loadedCount = 0;

function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            console.log(reader.result);
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = (e) => {
        throw new RegisterGeodeError(e);
    }
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

function loadGame(gameId, isGameHub) {
    gameDatabase.classList.add('is-hidden');
    if (isGameHub) {
        fetch('/files/' + `https://gamehubapi.onrender.com/games/${gameId}?hostname=gamehub.onrender.com`)
            .then((res) => res.json())
            .then((game) => {
                gameFrame.src = __uv$config.prefix + __uv$config.encodeUrl(game.url);
                gameFrame.setAttribute('onerror', `throw new RegisterGeodeError('Failed to load game #${gameId} from GameHub`);
                if (gameFrame.contentDocument.includes('error')) {
                    alert('bru');
                }
            }).catch(e => {
                throw new RegisterGeodeError(`Failed to load game #${gameId} from GameHub`);
            })
    } else {
        fetch('/assets/JSON/gs.json')
            .then((res) => res.json())
            .then((games) => {
                if (games[gameId].use_proxy) {
                    try {
                        gameFrame.src = __uv$config.prefix + __uv$config.encodeUrl(games[gameId].path);
                    } catch (e) {
                        gameFrameContainer.classList.add('is-hidden');
                        searchBar.classList.remove('is-hidden');
                        gameDatabase.classList.remove('is-hidden');

                        throw new RegisterGeodeError(`Failed to load the game ${games[gameId].name}`);
                    }
                } else {
                    gameFrame.src = games[gameId].path;
                }
            }).catch(e => {
                throw new RegisterGeodeError('Failed to load local gs.json file');
            })
    }

    gameFrameContainer.classList.remove('is-hidden');
    searchBar.classList.add('is-hidden');
    document.querySelector('.content').style.marginTop = '0px';
}

fetch('/assets/JSON/gs.json')
    .then((res) => res.json())
    .then((games) => {
        for (let i = 0; i < games.length; i++) {
            const game = games[i];

            var gameEl = document.createElement('div');
            gameEl.classList = 'game';
            gameEl.title = game.name;
            gameEl.innerHTML = `<img src="${'/files/' + game.thumbnail}" onerror="throw new RegisterGeodeError('Failed to load file: ${game.thumbnail}');"/><p>${game.name}</p>`;
            document.querySelector('.games').appendChild(gameEl);
            gameEl.addEventListener('click', (e) => {
                loadGame(i);
            });
        }

        loaded = true;
        loadedCount += 1;
    }).catch((e) => {
        loadedCount += 1;
        throw new RegisterGeodeError('Failed to load local games');
    })

fetch('/files/' + 'https://gamehubapi.onrender.com/games')
    .then((res) => res.json())
    .then((games) => {
        for (let i = 0; i < games.length; i++) {
            const game = games[i];

            var gameEl = document.createElement('div');
            gameEl.classList = 'game';
            gameEl.title = game.name;
            gameEl.innerHTML = `<img src="${'/files/' + game.thumbnail}" onerror="throw new RegisterGeodeError('Failed to load file: ${game.thumbnail}'); this.src='/assets/img/'"/><p>${game.name}</p>`;
            document.querySelector('.games').appendChild(gameEl);
            gameEl.addEventListener('click', (e) => {
                loadGame(game.id, true);
            });
        }

        loaded = true;
        loadedCount += 1;
    }).catch((e) => {
        loadedCount += 1;
        throw new RegisterGeodeError('Failed to load games from GameHub');
    })

searchBar.addEventListener('input', (e) => {
    if (loaded) {
        if (searchBar.value) {
            const searchQuery = searchBar.value.toLowerCase();
            let searchResults = 0;
            let gamesSearched = 0;

            for (let i = 0; i < document.querySelectorAll('.game').length; i++) {
                const game = document.querySelectorAll('.game')[i];

                if (!game.title.toLowerCase().includes(searchQuery)) {
                    game.classList.add('is-hidden');
                } else {
                    game.classList.remove('is-hidden');
                    searchResults += 1;
                }

                gamesSearched += 1;
            }

            var searchInterval = setInterval(() => {
                if (gamesSearched === document.querySelectorAll('.game').length) {
                    clearInterval(searchInterval)

                    if (searchResults === 0) {
                        document.querySelector('.no_results').classList.remove('is-hidden');
                        document.querySelector('#searchQuery').textContent = searchBar.value;
                    } else {
                        document.querySelector('.no_results').classList.add('is-hidden');
                    }
                }
            }, 10);
        } else {
            for (let i = 0; i < document.querySelectorAll('.game').length; i++) {
                const game = document.querySelectorAll('.game')[i];
                game.classList.remove('is-hidden');
            }

            document.querySelector('.no_results').classList.add('is-hidden');
        }
    }
})

var loadInterval = setInterval(() => {
    if (loaded && loadedCount === 2) {
        clearInterval(loadInterval);

        gameDatabase.classList.remove('is-hidden');
        loader.classList.add('is-hidden');
        if (searchBar.value) {
            const searchQuery = searchBar.value.toLowerCase();
            let searchResults = 0;
            let gamesSearched = 0;

            for (let i = 0; i < document.querySelectorAll('.game').length; i++) {
                const game = document.querySelectorAll('.game')[i];

                if (!game.title.toLowerCase().includes(searchQuery)) {
                    game.classList.add('is-hidden');
                } else {
                    game.classList.remove('is-hidden');
                    searchResults += 1;
                }

                gamesSearched += 1;
            }

            var searchInterval = setInterval(() => {
                if (gamesSearched === document.querySelectorAll('.game').length) {
                    clearInterval(searchInterval)

                    if (searchResults === 0) {
                        document.querySelector('.no_results').classList.remove('is-hidden');
                        document.querySelector('#searchQuery').textContent = searchBar.value;
                    } else {
                        document.querySelector('.no_results').classList.add('is-hidden');
                    }
                }
            }, 10);
        } else {
            for (let i = 0; i < document.querySelectorAll('.game').length; i++) {
                const game = document.querySelectorAll('.game')[i];
                game.classList.remove('is-hidden');
            }

            document.querySelector('.no_results').classList.add('is-hidden');
        }
    }
}, 10)