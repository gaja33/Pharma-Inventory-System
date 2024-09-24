import { Component, Inject, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-dealer-info",
  templateUrl: "./dealer-info.component.html",
  styleUrls: ["./dealer-info.component.scss"],
})
export class DealerInfoComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<DealerInfoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [""],
      contactNumber: [],
    });

    if (this.data) {
      let values = this.data.split(",");
      console.log(values);
      this.form.patchValue({
        name: values[0].split("Name:")[1],
        contactNumber: values[1].split("Number:")[1],
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.doAction();
  }

  doAction() {
    this.dialogRef.close({ event: "Submit", data: this.form.value });
  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancel" });
  }
}
