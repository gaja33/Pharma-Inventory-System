import { Input, Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import {
  AuthenticationService,
  TokenPayload,
} from "src/app/services/authentication/authentication.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  credentials: TokenPayload = {
    name: "",
    email: "",
    role: "",
    password: "",
  };

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.credentials = this.form.value;
      this.auth.login(this.credentials).subscribe(
        (resp) => {
          console.log(resp);
          if (resp.token) {
            this.router.navigate(["/admin"]);
          }
        },
        (err) => {
          console.log(err);
          this.openSnackBar(err.error.message, "Close");
        }
      );
    }
  }
}
