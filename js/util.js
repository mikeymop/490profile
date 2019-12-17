import { TimeStamp } from './date.js';

export class Util {

    songs = null;
    listens = null;
    payload = null;
    widget = null;

    constructor() {
        this.songs = null;
        this.listens = null;
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
            this.createMusicWidget(JSON.stringify(data));
        });
    }

    createMusicWidget(data) {
        data = JSON.parse(data);
        this.listens = data.payload.listens;
        console.log(`creating music widget with:\n${this.listens}`);
        let t = new Date("1576541156");
        console.log(`listen time is: ${t.getTimeStamp()}`);
        let music_widget = document.querySelector('#music-widget');
        music_widget.innerHTML = `
          <h3>Recent Listens:</h3>
          <div id="disclaimer">Listen history courtesty of ListenBrainz</div>
          <div id="track-list"
            <div>
          </div>
        `;
    }
}