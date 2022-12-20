import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavItem } from "./ui/model/nav-item";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import { menu } from "./ui/model/menu";
import { filter, map } from "rxjs/operators";
import { Router } from "@angular/router";
import {
  AuthenticationService,
  UserDetails,
} from "src/app/services/authentication/authentication.service";

@Component({
  selector: "app-side-main-nav",
  templateUrl: "./side-main-nav.component.html",
  styleUrls: ["./side-main-nav.component.scss"],
})
export class SideMainNavComponent implements OnInit, OnDestroy {
  public opened = true;
  private mediaWatcher: Subscription;
  public menu: NavItem[] = menu;
  details: UserDetails;

  constructor(
    private media: MediaObserver,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.mediaWatcher = this.media
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((mediaChange: MediaChange) => {
        this.handleMediaChange(mediaChange);
      });
  }

  ngOnInit() {
    this.auth.profile().subscribe((resp) => {
      console.log(resp);
      this.details = resp;
    });
  }

  private handleMediaChange(mediaChange: MediaChange): void {
    if (this.media.isActive("lt-md")) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

  signout() {
    //this.router.navigate(['/signin'])
    this.auth.logout();
  }
}
