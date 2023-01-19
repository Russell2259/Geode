var loaded = false;

fetch('/assets/JSON/gs.json')
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
                
            });
        }

        loaded = true;
    }).catch((e) => {
        alert(e);
    })

fetch('https://gamehubapi.onrender.com/games')
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

        loaded = true;
    }).catch((e) => {
        console.log(e);
    })

const searchBar = document.querySelector('#search');
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

var searchInterval = setInterval(() => {
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
}, 10)