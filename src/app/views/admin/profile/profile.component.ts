import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ProfileService } from "src/app/services/profile/profile.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
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

    this.profileService
      .getProfile(localStorage.getItem("storeId"))
      .subscribe((resp) => {
        console.log(resp);
        this.form.patchValue(resp);
      });
  }

  updateProfile() {
    this.profileService
      .updateProfile(localStorage.getItem("storeId"), this.form.value)
      .subscribe((response) => {
        console.log(response);
        if (response.messagecode === 200) {
          this.router.navigateByUrl("/admin/home");
        }
      });
  }

  submit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.updateProfile();
  }
}
