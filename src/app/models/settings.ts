export interface Task {
    name: string,
    hourlyRate: number,
    prodRate: number,
    color?: string
}

export interface Settings {
    showRates: boolean,
    offlineMode: boolean,
    tasks: Task[]
}