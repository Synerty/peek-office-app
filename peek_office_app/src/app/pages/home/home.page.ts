import { ChangeDetectionStrategy, Component } from "@angular/core"
import { HeaderService, NavBackService, NgLifeCycleEvents } from "@synerty/peek-plugin-base-js"

@Component({
    selector: "home-page",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage extends NgLifeCycleEvents {
    
    constructor(
        headerService: HeaderService,
        public navBackService: NavBackService
    ) {
        super()
        headerService.setTitle("Peek Home")
    }
}

