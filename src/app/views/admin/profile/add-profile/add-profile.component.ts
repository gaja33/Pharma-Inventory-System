import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ProfileService } from "src/app/services/profile/profile.service";

@Component({
  selector: "app-add-profile",
  templateUrl: "./add-profile.component.html",
  styleUrls: ["./add-profile.component.scss"],
})
export class AddProfileComponent implements OnInit {
  form: FormGroup = new FormGroup({
    storeName: new FormControl(""),
    contactNumber: new FormControl(""),
    storeAddress: new FormControl(""),
    state: new FormControl(""),
    gstin: new FormControl(""),
    drugLicense: new FormControl(""),
    jurisdiction: new FormControl(""),
    billPrefix: new FormControl(""),
    previousBillCount: new FormControl(""),
  });

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.form.value);
    this.profileService.createProfile(this.form.value).subscribe((resp) => {
      if (resp._id) {
        sessionStorage.setItem("storeId", resp._id);
      }
    });
    this.dialog.closeAll();
  }
}
