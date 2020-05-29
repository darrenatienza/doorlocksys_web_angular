import { Guid } from 'guid-typescript';

export interface UserActivity {
    createTimeStamp?: string;
    action: string ;
    message: string ;
    userGuid?: Guid;
    recordGuid?: Guid;
}
