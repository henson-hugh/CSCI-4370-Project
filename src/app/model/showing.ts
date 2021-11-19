export class Showing {
    movieid: number;
    roomid: number;
    date: Date;
    time: Date;
    
    constructor(date: Date, time: Date){
        this.date = date;
        this.time = time;
    }
}