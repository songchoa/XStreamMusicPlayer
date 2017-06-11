import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Song } from './song';

@Component({
    selector: "my-controller",
    template: `
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <my-display [title]="songTitle"></my-display>
        <br>
        <div>
            <a><i (click)="previous()" class="material-icons" style="font-size:7em">skip_previous</i></a>
            <a><i id="playIcon" (click)="playMusic()" class="material-icons" style="font-size:7em">play_arrow</i></a>
            <a><i (click)="next()" class="material-icons" style="font-size:7em">skip_next</i></a>
        </div>
    `,
    styles: [`
        div {
            border: 2px solid green;
            text-align: center;
        }
        i {
            padding: 10px;
        }
        i:hover { color:white;}

        a { cursor:pointer; }

        h3 { 
            text-align: center;
        }

        p {
            text-align: left;
        }
    `]
})

export class ControllerComponent {
    songTitle = "no disc";
    curr = new Audio();
    songdex : number;
    playing : boolean;
    songs = new Array();

    items : FirebaseListObservable<Song[]>;
    constructor(db : AngularFireDatabase) {
        this.items = db.list('songs');
        this.items.subscribe(
            items => items.forEach(
                item => {
                    this.songs.push(item);
                }
            )
        );

        this.playing = false;
        this.songdex = 0;
        this.curr.onended = () => {
            this.next();
        }
    }

    

    playMusic() : void 
    {
            if(this.curr.src.trim() == "")
            {   
                if(this.songs[this.songdex] == undefined) {
                   
                    return;
                }
                
                this.curr.src = this.songs[this.songdex].src;
            }

            if(this.playing)
            {
                this.curr.pause();
                this.playing = false;
                document.getElementById("playIcon").innerHTML = "play_arrow";
            }
            else
            {
                this.curr.play();
                this.playing = true;
                document.getElementById("playIcon").innerHTML = "pause";
            }

            this.songTitle = this.songs[this.songdex].title;
        
    }

    next() 
    {
        this.songdex = this.songdex + 1;
        this.songdex = this.songdex % this.songs.length;

        this.curr.src = this.songs[this.songdex].src;
        this.curr.load();
        this.playing = false;
        this.playMusic();
    }

    previous()
    {
        this.songdex = this.songdex - 1;
        if(this.songdex < 0) this.songdex = this.songs.length - 1;

        this.curr.src = this.songs[this.songdex].src;
        this.curr.load();
        this.playing = false;
        this.playMusic();
    }


}