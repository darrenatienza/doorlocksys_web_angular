import { ISGPrintFooterLS } from './interfaces';

export class SGPrintFooterLS implements ISGPrintFooterLS {
    preparedByName = '';
    verifiedByName = '';
    reviewedByName = '';
    approvedByName = '';
    preparedByDesignation = '';
    verifiedByDesignation = '';
    reviewedByDesignation = '';
    approvedByDesignation = '';
    key = 'd444b811-79af-4583-b404-bb858ad190af';
    constructor() {

        const sval = localStorage.getItem(this.key);
        if (sval != null) {
            const obj = JSON.parse(sval);
            this.preparedByName = obj.preparedByName;
            this.verifiedByName = obj.verifiedByName;
            this.reviewedByName = obj.reviewedByName;
            this.approvedByName = obj.approvedByName;
            this.preparedByDesignation = obj.preparedByDesignation;
            this.verifiedByDesignation = obj.verifiedByDesignation;
            this.reviewedByDesignation = obj.reviewedByDesignation;
            this.approvedByDesignation = obj.approvedByDesignation;
        }
    }
    save() {
        const obj = {
            'approvedByDesignation': this.approvedByDesignation,
            'approvedByName': this.approvedByName,
            'preparedByDesignation': this.preparedByDesignation,
            'preparedByName': this.preparedByName,
            'reviewedByDesignation': this.reviewedByDesignation,
            'reviewedByName': this.reviewedByName,
            'verifiedByDesignation': this.verifiedByDesignation,
            'verifiedByName': this.verifiedByName
        };
        localStorage.setItem(this.key, JSON.stringify(obj));
    }
    remove() {
        localStorage.removeItem(this.key);
    }


}
