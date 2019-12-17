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
        this.createProjectWidget();
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
        music_widget.class = "card";
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

    createProjectWidget() {
        let project_widget = document.querySelector("#project-widget");
        project_widget.innerHTML = `
          <h3 >Recent Projects:</h3>
          <table>
            <tr>
              <th>
                <div class="card" style="width: 18rem; padding: 10px; margin: .8rem">
                  <img src="http://defrances.co/img/icon.png" class="card-image" style="margin: auto; width: 5rem; height: 5rem"></img>
                  <div class="card-title" style="margin: 5px;">Personal Blog <a href="http://defrances.co"><i>(Link)</i></a></div>
                  <div class="card-body">
                      <p class="card-text">My Personal Website, written using node.js and hugo</p>
                  </div>
                </div>
              </th>
              <th>
                <div class="card" style="width: 18rem; padding: 10px; margin: .8rem">
                  <img src="https://via.placeholder.com/150" class="card-image" style="margin: auto; width: 5rem; height: 5rem"></img>
                  <div class="card-title" style="margin: 5px;">Grader Gater <a href="https://web.njit.edu/~md537/dev"><i>(Link)</i></a></div>
                  <div class="card-body">
                      <p class="card-text">A SPA created for the CS 490 Final Project</p>
                  </div>
                </div>
              </th>
            <tr>
          </table>
        `;
    }
}