import { Component } from "@angular/core"
import { NavBackService, NgLifeCycleEvents, HeaderService } from "@synerty/peek-plugin-base-js"

@Component({
    selector: "peek-main-home",
    templateUrl: "main-home.component.dweb.html",
    styleUrls: ["main-home.component.dweb.scss"]
})
export class MainHomeComponent extends NgLifeCycleEvents {
    
    constructor(
        headerService: HeaderService,
        public navBackService: NavBackService
    ) {
        super()
        
        headerService.setTitle("Peek Home")
    }
    
}

