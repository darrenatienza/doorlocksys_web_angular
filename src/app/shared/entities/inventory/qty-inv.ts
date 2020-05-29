import { ReadAllInvStat } from './inv-stat';

export interface ReadOneQtyInv {
    invStatID: any;
    qtyInvID: number;
    invTypeID: number;
    invLocationID: number;
    count: number;
    remarks: string;
}
export interface ReadAllQtyInv {
    qtyInvID: number;
    invType_Description?: string;
    invLocation_Description?: string;
    count: number;
    invRecCount: number;
    total: number;
    unRecInvStats?: ReadAllInvStat[];
    recInvStats?: ReadAllInvStat[];

}
