export class TimeStamp extends Date {
    constructor(time) {
        //takes unix time and makes into a datetime
        super();
        this.unixtime = Number(time) * 1000;
    }

    setTime(time){
        this.time = time;
    }

    getMonthName() {
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let a = new Date(Number(this.unixtime));
        let month = months[a.getMonth()];
        return month;

    }
}