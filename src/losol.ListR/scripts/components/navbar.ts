import {Component, Directive} from '@angular/core';
import {
    CollapseDirective,
    DROPDOWN_DIRECTIVES,
    Ng2BootstrapConfig,
    Ng2BootstrapTheme
} from 'ng2-bootstrap';

@Component({
    selector: 'header-navbar',
    template: 'navbar-template.html',
    directives: [
    ]
})

export class Navbar {
    public isCollapsed: boolean = true;
}
