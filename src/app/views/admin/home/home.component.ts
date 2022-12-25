import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { ProfileService } from "src/app/services/profile/profile.service";
import { AddProfileComponent } from "../profile/add-profile/add-profile.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  storeDetails: any;
  constructor(
    private auth: AuthenticationService,
    public dialog: MatDialog,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    if (
      sessionStorage.getItem("storeId") === "null" ||
      sessionStorage.getItem("storeId") === null
    ) {
      this.openDialog();
      return;
    }
    this.profileService
      .getProfile(sessionStorage.getItem("storeId"))
      .subscribe((resp) => {
        if (resp) {
          this.storeDetails = resp;
        }
      });
    console.log(this.storeDetails);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProfileComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
