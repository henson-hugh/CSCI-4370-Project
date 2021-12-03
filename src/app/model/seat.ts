export class Seat {
    sid: number;
    showroomid: number;
    seatname: string;
    time: Date;
    date: Date;

    constructor(roomid: number, name: string, stime: Date, sDate: Date){
      this.showroomid = roomid;
      this.seatname = name;
      this.time = stime;
      this.date = sDate;
    }
}
