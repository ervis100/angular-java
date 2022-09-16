export class Auth {
    constructor(public email: string,
        public username: string,
        public name: string,
        //public role:string,
        private _token: string,
        public tokenExpiration: string
    ) { }

    get token() {
        if (!!this._token) {
            if (new Date(+this.tokenExpiration).getTime() > new Date().getTime()) {
                return this._token;
            }
        }
        return null;
    }
}