import { Guid } from 'guid-typescript';

export class CurrentUser {

    public userName: string;
    public userGuid: Guid;
    private key = '56077350-a14c-49a6-9748-2998f3087961';
    constructor() {

        const sval = localStorage.getItem(this.key);
        if (sval != null) {
            const obj = JSON.parse(sval);
            this.userGuid = obj.userGuid;
            this.userName = obj.userName;
        }
    }
    save() {
        const obj = {
            'userName': this.userName,
            'userGuid': this.userGuid
        };
        localStorage.setItem(this.key, JSON.stringify(obj));
    }
    remove() {
        localStorage.removeItem(this.key);
    }
}
