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

    // getTimeStamp() {
    //     let a = new Date(Number(this.unixtime));
    //     let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //     let year = a.getFullYear();
    //     let month = months[a.getMonth()];
    //     let date = a.getDate();
    //     let hour = a.getHours();
    //     let min = a.getMinutes();
    //     let sec = a.getSeconds();
    //     let time = `${date} ${month} ${year}`;
    //     //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    //     return time;
    // }
}