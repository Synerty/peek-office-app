import {Component} from "@angular/core";
import { HeaderService } from "@synerty/peek-plugin-base-js"
import {configLinks} from "@_peek/plugin-config-links";


@Component({
    selector: "peek-main-config",
    templateUrl: 'main-config.component.dweb.html'
})
export class MainConfigComponent {

    appDetails = configLinks;

    constructor(headerService: HeaderService) {
        headerService.setTitle("Peek Config");

    }


}

