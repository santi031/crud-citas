export interface IAppointment {
    id: number;
    name: string,
    description?: string,
    color: string,
    duration: number,
    active: boolean,
    creationDate?: Date,
    updateDate?: Date
}
