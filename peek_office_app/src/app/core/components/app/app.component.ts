import { ChangeDetectionStrategy, Component } from "@angular/core"
import { DeviceStatusService } from "@peek/peek_core_device"
import { UserService } from "@peek/peek_core_user"
import { NgLifeCycleEvents } from "@synerty/peek-plugin-base-js"

@Component({
    selector: "app-component",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends NgLifeCycleEvents {
    
    loggedIn = false
    
    constructor(
        private deviceStatusService: DeviceStatusService,
        public userService: UserService,
    ) {
        super()
        
        this.loggedIn = this.userService.loggedIn
        this.userService.loggedInStatus
            .takeUntil(this.onDestroyEvent)
            .subscribe(v => this.loggedIn = v)
    }
    
    showLoading(): boolean {
        return this.deviceStatusService.isLoading
    }
}
