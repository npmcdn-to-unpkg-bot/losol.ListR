import { Component } from '@angular/core'

@Component({
    selector: 'my-friends',
    providers: [],
    template: `
    <h1 class="main-text">Hello from the {{ componentName }}.</h1>
    `
})
export class FriendComponent {
    componentName: 'FriendComponent'
}