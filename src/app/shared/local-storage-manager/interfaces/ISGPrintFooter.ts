import { ILocalStorage } from './base/ilocal-storage';
export interface ISGPrintFooterLS extends ILocalStorage {
    preparedByName: string;
    verifiedByName: string;
    reviewedByName: string;
    preparedByDesignation: string;
    verifiedByDesignation: string;
    reviewedByDesignation: string;
    approvedByDesignation: string;
    approvedByName: string;
}
