export enum MainState {
    InitialWorkingTime = 'InitialWorkingTime',
    // InitialNonWorkingTime = "InitialNonWorkingTime",
    CallOrdered = 'CallOrdered',
    ManagerAnswered = 'ManagerAnswered',
    LeadAnswered = 'LeadAnswered',
    LeadUnreachable = 'LeadUnreachable',
    DefaultResult = 'DefaultResult',
    Ended = 'Ended',
    WeCallYouLater = 'WeCallYouLater',
}

export enum WindowState {
    Minimized = 'Minimized',
    Opened = 'Opened',
}
