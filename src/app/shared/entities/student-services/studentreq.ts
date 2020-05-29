export interface StudentReq {
    studentSrCode?: string;
    studentReqID?: number;
    studentID: number;
    createDate: string;
    studentReqTypeID: number;
    receiptNum: string;
    schoolYearID: number;
    semester: string;
    isAvailable: boolean;
    isClaimed: boolean;
    locationID: number;
    claimedDate: string;
    reason: string;
    remarks: string;
}
