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
        console.log(`creating music widget...`);
        let t = new TimeStamp(1576541156 * 1000);
        console.log(`listen time is: ${t.getFullYear()}-${t.getMonthName()}`);
        let music_widget = document.querySelector('#music-widget');
        music_widget.innerHTML = `
          <h3 class="card-title"> Recent Listens: &#x1F3B6</h3>
          <div id="disclaimer" class="card-subtitle" mb-2 text-muted>
            Listen history courtesy of <a href="https://listenbrainz.org/user/mikeymop">ListenBrainz</a>
          </div>
          <div id="track-list" class="card-body">
            <table class="table table-condensed" id="listens">
              <thead>
                <tr>
                  <th>Listen Time:</th>
                  <th>Artist:</th>
                  <th>Song:</th>
                </tr>
              </thead>
            </table>
          </div>
        `;
        let table = document.querySelector('.table');
        let tbody = document.createElement('tbody');
        let i = 0;
        for(let entry of this.listens) {
            if(i == 10) { break; }
            this.addRow(tbody, entry, i);
            i += 1;
        }
        table.appendChild(tbody);
    }

    addRow(tbody, entry, idx) {
        console.log(`addrow`);
        console.log(entry);
        let t_stamp = new TimeStamp(Number(entry.listened_at));
        let track = entry.track_metadata;
        let row = document.createElement("tr");
        if(idx == 0) {
            row.innerHTML = `
              <td> &#x1F3A7 ${t_stamp.getMonthName()} ${t_stamp.getDate()} ${t_stamp.getFullYear()}</td>
              <td>${track.artist_name}</td>
              <td>${track.track_name}</td>
            `;
        } else {
            row.innerHTML = `
              <td>${t_stamp.getMonthName()} ${t_stamp.getDate()} ${t_stamp.getFullYear()}</td>
              <td>${track.artist_name}</td>
              <td>${track.track_name}</td>
            `;
        }
        tbody.appendChild(row);
    }
}