import { ILocalStorage } from './base/ilocal-storage';


export interface IInventoryLocalStorage extends ILocalStorage {
     location: string;
     type: string;
     status: string;
     criteria: string;

}
