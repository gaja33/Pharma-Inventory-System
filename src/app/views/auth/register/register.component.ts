import { Input, Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  AuthenticationService,
  TokenPayload,
} from "src/app/services/authentication/authentication.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    role: new FormControl("", Validators.required),
  });

  credentials: TokenPayload = {
    name: "",
    email: "",
    role: "",
    password: "",
  };

  constructor(private router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.credentials = this.form.value;
      this.auth.register(this.credentials).subscribe(
        (resp) => {
          this.router.navigate(["/admin"]);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}
