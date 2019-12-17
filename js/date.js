export class TimeStamp {
    constructor(time) {
        //takes unix time and makes into a datetime
        this.time = time;
    }

    setTime(time){
        this.time = time;
    }

    getTimeStamp() {
        let UNIX_timestamp = this.time;
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let time = `${date} ${month} ${year}`;
        //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }
}