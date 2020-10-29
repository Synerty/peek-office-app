import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { NzAlertModule } from 'ng-zorro-antd/alert'
import { NzIconModule } from "ng-zorro-antd/icon"
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { RouterModule } from "@angular/router"
import { HttpClientModule } from "@angular/common/http"
import { BalloonMsgModule } from "@synerty/peek-plugin-base-js"
import {
    TupleActionPushOfflineSingletonService,
    TupleDataObservableNameService,
    TupleOfflineStorageNameService,
    TupleStorageFactoryService,
    TupleStorageFactoryServiceWeb,
    WebSqlBrowserFactoryService,
    WebSqlFactoryService,
} from "@synerty/vortexjs"
import { staticRoutes } from "./app.routes"
import { peekRootServices } from "./app.services"
import { AppComponent } from "./app.component"
import { MainHomeComponent } from "./main-home/main-home.component"
import { MainConfigComponent } from "./main-config/main-config.component"
import { MainSidebarComponent } from "./main-sidebar/main-sidebar.component"
import { UnknownRouteComponent } from "./unknown-route/unknown-route.component"
import { pluginRootModules } from "../@_peek/plugin-root-modules"
import { pluginRootServices } from "@_peek/plugin-root-services"
import { PluginRootComponent } from "./plugin-root.component"
import { en_US, NZ_I18N } from "ng-zorro-antd/i18n"
import { registerLocaleData } from "@angular/common"
import en from "@angular/common/locales/en"
import { SearchModule } from "@_peek/peek_core_search/search.module"

registerLocaleData(en)

export function tupleDataObservableNameServiceFactory() {
    return new TupleDataObservableNameService("peek_office_service", {
        plugin: "peek_office_service",
    })
}

export function tupleOfflineStorageNameServiceFactory() {
    return new TupleOfflineStorageNameService("peek_office_service")
}

@NgModule({
    declarations: [
        AppComponent,
        MainHomeComponent,
        MainConfigComponent,
        MainSidebarComponent,
        UnknownRouteComponent,
        PluginRootComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        RouterModule.forRoot(staticRoutes),
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        NzIconModule,
        BalloonMsgModule,
        ...pluginRootModules,
        SearchModule,
        NzAlertModule,
        NzToolTipModule,
        NzButtonModule,
    ],
    providers: [
        {provide: NZ_I18N, useValue: en_US},
        {
            provide: WebSqlFactoryService,
            useClass: WebSqlBrowserFactoryService,
        },
        {
            provide: TupleStorageFactoryService,
            useClass: TupleStorageFactoryServiceWeb,
        },
        TupleActionPushOfflineSingletonService,
        ...peekRootServices,
        ...pluginRootServices,
    ],
})
export class AppModule {
}
