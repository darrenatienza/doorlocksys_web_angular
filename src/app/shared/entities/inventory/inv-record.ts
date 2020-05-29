import { Guid } from 'guid-typescript';

export interface ReadAllInvRecord {
    invRecordID?: number;
    propertyNum: string;
    equipNum: string;
    invDetail_Description?: string;
    invLocation_Description?: string;
    dateAcquired: string;
    status: string;
}

export interface ReadOneInvRec {


    invRecordID?: number;
    invRecordGUID?: Guid;
    propertyNum: string;
    equipNum: string;
    dateAcquired: string;
    invStatID: number;
    invDetailID: number;
    invTypeID: number;
    invLocationID: number;
    remarks: string;
}
