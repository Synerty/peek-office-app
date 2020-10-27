import { Component } from "@angular/core"
import { homeLinks } from "@_peek/plugin-home-links"
import {
    FooterService,
    IConfigLink,
    IHeaderLink,
    NgLifeCycleEvents,
    NavBackService,
    HeaderService
} from "@synerty/peek-plugin-base-js"
import { VortexStatusService } from "@synerty/vortexjs"
import { LoggedInGuard } from "@peek/peek_core_user"
import { filter, map } from "rxjs/operators"

@Component({
    selector: "peek-main-sidebar",
    templateUrl: "main-sidebar.component.dweb.html",
    styleUrls: ["main-sidebar.component.dweb.scss"]
})
export class MainSidebarComponent extends NgLifeCycleEvents {
    appDetails = homeLinks
    title: string = "Peek"
    isEnabled: boolean = true
    vortexIsOnline: boolean = false
    configLinks: IConfigLink[] = []
    statusText: string = ""
    showSearch = false
    
    leftLinks$ = this.headerService.links$.pipe(map(
        links => links.filter(link => !!link.left))
    )
    rightLinks$ = this.headerService.links$.pipe(map(
    links => links.filter(link => !link.left)))
    
    constructor(
        private vortexStatusService: VortexStatusService,
        private footerService: FooterService,
        private headerService: HeaderService,
        private navBackService: NavBackService,
        private loggedInGuard: LoggedInGuard
    ) {
        super()
        
        headerService.title$.takeUntil(this.onDestroyEvent)
            .subscribe(v => this.title = v)
        
        headerService.isEnabled$.takeUntil(this.onDestroyEvent)
            .subscribe(v => this.isEnabled = v)
        
        vortexStatusService.isOnline.takeUntil(this.onDestroyEvent)
            .subscribe(v => this.vortexIsOnline = v)
        
        footerService.statusText
            .takeUntil(this.onDestroyEvent)
            .subscribe(v => this.statusText = v)
        
        this.configLinks = footerService.configLinksSnapshot
        footerService.configLinks
            .takeUntil(this.onDestroyEvent)
            .subscribe(v => this.configLinks = v)
        
    }
    
    // ------------------------------
    // Display methods
    
    isBackButtonEnabled(): boolean {
        return this.navBackService.navBackLen() != 0
    }
    
    linkTitle(title: IHeaderLink) {
        if (title.badgeCount == null) {
            return title.text
        }
        
        if (title.left) {
            return `${title.text} (${title.badgeCount})`
        }
        
        return `(${title.badgeCount}) ${title.text}`
        
    }
    
    showSearchClicked(): void {
        if (this.showSearch == true) {
            this.showSearch = false
            return
        }
        
        const canActivate: any = this.loggedInGuard.canActivate()
        if (canActivate === true)
            this.showSearch = true
        else if (canActivate.then != null)
            canActivate.then((val: boolean) => this.showSearch = val)
    }
}

