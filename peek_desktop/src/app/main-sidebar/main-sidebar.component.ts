import {Component} from "@angular/core";
import {homeLinks} from "../../plugin-home-links";
import {
    ConfigLink,
    FooterService,
    NavBackService,
    TitleBarLink,
    TitleService
} from "@synerty/peek-util";
import {ComponentLifecycleEventEmitter, VortexStatusService} from "@synerty/vortexjs";


@Component({
    selector: "peek-main-sidebar",
    templateUrl: 'main-sidebar.component.dweb.html',
    styleUrls: ["main-sidebar.component.dweb.scss"],
    moduleId: module.id
})
export class MainSidebarComponent extends ComponentLifecycleEventEmitter {

    appDetails = homeLinks;

    private leftLinks = [];
    private rightLinks = [];

    title: string = "Peek";
    isEnabled: boolean = true;
    vortexIsOnline: boolean = false;


    configLinks: ConfigLink[] = [];
    statusText: string = "";

    constructor(vortexStatusService: VortexStatusService,
                footerService: FooterService,
                titleService: TitleService,
                private navBackService: NavBackService) {
        super();
        this.leftLinks = titleService.leftLinksSnapshot;
        this.rightLinks = titleService.rightLinksSnapshot;

        titleService.title.takeUntil(this.onDestroyEvent)
            .subscribe(v => this.title = v);

        titleService.isEnabled.takeUntil(this.onDestroyEvent)
            .subscribe(v => this.isEnabled = v);

        titleService.leftLinks.takeUntil(this.onDestroyEvent)
            .subscribe(v => this.leftLinks = v);

        titleService.rightLinks.takeUntil(this.onDestroyEvent)
            .subscribe(v => this.rightLinks = v);

        vortexStatusService.isOnline.takeUntil(this.onDestroyEvent)
            .subscribe(v => this.vortexIsOnline = v);

        footerService.statusText
            .takeUntil(this.onDestroyEvent)
            .subscribe(v => this.statusText = v);


        footerService.configLinks
            .takeUntil(this.onDestroyEvent)
            .subscribe(v => this.configLinks = v);

    }

    ngOnInit() {
    }


    // ------------------------------
    // Display methods

    isBackButtonEnabled(): boolean {
        return this.navBackService.navBackLen() != 0;
    }

    linkTitle(title: TitleBarLink) {
        if (title.badgeCount == null) {
            return title.text;
        }

        if (title.left) {
            return `${title.text} (${title.badgeCount})`;
        }

        return `(${title.badgeCount}) ${title.text}`;

    }


}

