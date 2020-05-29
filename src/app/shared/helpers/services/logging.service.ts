import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    constructor(private logger: NGXLogger) {

    }
    logError(message: string, stack: string) {
        // Send errors to server here
        console.log('LoggingService: ' + message);
        // this.logger.error(message);
    }
}
