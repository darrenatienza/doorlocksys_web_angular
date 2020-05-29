import { IInventoryLocalStorage } from './interfaces/iinventory-local-storage';



export class InventoryLocalStorage implements IInventoryLocalStorage {
    public location = '';
    public type = '';
    public status = '';
    key = 'e79a8c10-23f4-4e03-a669-ae7cddfd9c99';
    public criteria = '';
    constructor() {

        const sval = localStorage.getItem(this.key);
        if (sval != null) {
            const obj = JSON.parse(sval);
            this.location = obj.location;
            this.type = obj.type;
            this.status = obj.status;
            this.criteria = obj.criteria;
        }
    }
    save() {
        const obj = {
            'location': this.location,
            'type': this.type,
            'status': this.status,
            'criteria': this.criteria
        };
        localStorage.setItem(this.key, JSON.stringify(obj));
    }
    remove() {
        localStorage.removeItem(this.key);
    }

}
