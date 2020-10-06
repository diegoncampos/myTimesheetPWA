import { Times } from './times'
export interface User {
    email: string;
    displayName: string;
    photoURL?: string;
    groupId: number;
    times: Times[];
 }