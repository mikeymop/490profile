export class Util {

    songs = null;
    listens = null;
    payload = null;
    widget = null;

    constructor() {
        this.songs = null;
        this.create();
    }

    create() {
        console.log("creating Util...");
        this.getSongHistory();
    }

    getSongHistory() {
        let url = "https://api.listenbrainz.org/1/user/mikeymop/listens"
        console.log(`Getting listen history from:\n${url}`);
        fetch(url, {
            "method": 'GET',
        }).then((response) => {
            console.log(`response:\n${response}`);
            return response.json();
        }).then((data) => {
            console.log(`fetch got:\n${JSON.stringify(data)}`);
            this.listens = data.listens;
            this.createMusicWidget(data);
        });
    }

    createMusicWidget() {
        console.log("creating music widget");
        let music_widget = document.querySelector('#music-widget');
        console.log(music_widget);
        console.log(this.listens);
    }
}