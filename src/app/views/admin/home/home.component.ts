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
    console.log(sessionStorage.getItem("storeId"));
    if (
      sessionStorage.getItem("storeId") === "null" ||
      sessionStorage.getItem("storeId") === null
    ) {
      this.openDialog();
      return;
    }
    this.storeDetails = JSON.parse(sessionStorage.getItem("storeDetails"));
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProfileComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
