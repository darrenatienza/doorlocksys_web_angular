import { environment } from '../../../../environments/environment';

export class Config {
    publish = environment.production;
    // Get API Url
    getAPIUrl(v: string, src: string) {
        console.log(this.publish);
        if (!this.publish) {

            return 'http://localhost:39048/api/v' + v + '/' + src;
        } else {
            return 'http://192.168.192.4/core/api/v' + v + '/' + src;
        }


    }
    getAPIUrlWithAction(v: string, src: string, action: string) {

        if (!this.publish) {
            return 'http://localhost:39048/api/v' + v + '/' + src + '/' + action;
        } else {
            return 'http://192.168.192.4/core/api/v' + v + '/' + src;
        }
   }
    /*getAPIUrl(v: string, src: string) {

    }*/
}
