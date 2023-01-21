class cookies_ {
    constructor() {
        this.cookie = document.cookie;

        this.get = (cookieName) => {
            this.cookie = document.cookie;

            const cookie = document.cookie.split('; ')
            .find((row) => row.startsWith(`${cookieName}=`))
            ?.split('=')[1];

            if (cookie) {
                return cookie;
            } else {
                throw `The cookie ${cookieName} cannot be retrived because it does not exist`;
            }
        }

        this.set = (cookieName, cookieValue) => {
            document.cookie = `${cookieName}=${cookieValue}; `;
            this.cookie = document.cookie;
        }

        this.clear = () => {
            document.cookie = '';
            this.cookie = document.cookie;
        }

        this.remove = (cookieName) => {
            const cookieValue = this.get(cookieName);

            if (document.cookie.includes(`${cookieName}=${cookieValue}; `)) {
                document.cookie = document.cookie.replace(`${cookieName}=${cookieValue}; `, '');
            } else if (document.cookie.includes(`; ${cookieName}=${cookieValue}`)) {
                document.cookie = document.cookie.replace(`; ${cookieName}=${cookieValue}`, '');
            } else {
                throw `The cookie ${cookieName} cannot be removed because it does not exist`;
            }

            this.cookie = document.cookie;
        }
    }
}

const cookies = new cookies_();