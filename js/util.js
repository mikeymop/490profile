export class Util {

    songs = null;
    widget = null;

    constructor() {
        this.songs = null;
        this.create();
    }

    create() {
        console.log("Util created");
    }

    getSongHistory() {
        let url = "https://api.listenbrainz.org/1/user/mikeymop/listens"
        console.log(`Getting listen history from:\n${url}`);
        fetch(url, {
            "method": "GET",
            "headers": "application/json"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(`fetch got:\n${JSON.stringify(data)}`);
            createMusicWidget(data);
        });
    }

    createMusicWidget() {
        console.log("creating music widget");
    }
}