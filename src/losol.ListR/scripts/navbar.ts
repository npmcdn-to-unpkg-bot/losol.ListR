import {Component, Directive} from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    directives: [CollapseDirective],
    selector: 'header-navbar',
    templateUrl: 'navbar-template.html'
})

export class Navbar {
    public isCollapsed: boolean = false;
}
