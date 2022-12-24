import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { AddProfileComponent } from "../profile/add-profile/add-profile.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthenticationService, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (
      sessionStorage.getItem("storeId") === "null" ||
      sessionStorage.getItem("storeId") === null
    ) {
      this.openDialog();
      return;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProfileComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
