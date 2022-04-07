export class Appointment {
    id: number = 0;
    name: string = "";
    description? = "";
    color: string = "";
    duration: number = 0;
    active: boolean = false;
    creationDate?: Date = new Date();
    updateDate?: Date = new Date();
}


