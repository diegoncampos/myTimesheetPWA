import { Task } from 'src/app/models/settings';

export interface Times {
    date: string,
    startTime: string,
    endTime: string,
    byProd: boolean,
    quantity: number,
    hadLunch?: boolean,
    lunchTime?: number,
    comments?: string,
    task:Task
}