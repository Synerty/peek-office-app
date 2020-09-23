import { Component } from "@angular/core"
import { NavBackService, NgLifeCycleEvents, TitleService } from "@synerty/peek-plugin-base-js"

@Component({
    selector: "peek-main-home",
    templateUrl: "main-home.component.dweb.html",
    styleUrls: ["main-home.component.dweb.scss"],
    moduleId: module.id
})
export class MainHomeComponent extends NgLifeCycleEvents {
    
    constructor(
        titleService: TitleService,
        public navBackService: NavBackService
    ) {
        super()
        
        titleService.setTitle("Peek Home")
    }
    
}

