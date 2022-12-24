import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
// Animation
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Layout module
import { LayoutModule } from "@angular/cdk/layout";
// Material modules
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SideMainNavComponent } from "./layouts/side-main-nav/side-main-nav.component";
import { MenuListItemComponent } from "./layouts/side-main-nav/ui/menu-list-item/menu-list-item.component";
import { HttpClientModule } from "@angular/common/http";

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatDialogModule,
];
@NgModule({
  declarations: [AppComponent, SideMainNavComponent, MenuListItemComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ...materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
