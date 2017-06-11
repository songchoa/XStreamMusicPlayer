import { Component, Input } from '@angular/core';

@Component({
    selector: "my-display",
    template: `
        <div> Now Playing: <span>{{title}}</span> </div>
    `,
    styles: [`
        div {
            border: 2px solid green;
            padding: 20px;
        }
        span { color: white; }
    `]
})

export class DisplayComponent {
    @Input() title : string;
}