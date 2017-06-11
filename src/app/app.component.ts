import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Song } from './song';
@Component({
  selector: 'app-root',
  template: `
      <h1>{{title}}</h1>
      <my-controller></my-controller>
  `,
  styles: [`
      h1 { text-align: center;}
  `],
})

export class AppComponent {
  title = 'XStream';
}
