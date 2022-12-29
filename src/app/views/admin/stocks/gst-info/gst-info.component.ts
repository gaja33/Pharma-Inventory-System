import { Component, Inject, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-gst-info",
  templateUrl: "./gst-info.component.html",
  styleUrls: ["./gst-info.component.scss"],
})
export class GstInfoComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<GstInfoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hsnCode: [""],
      cgst: [0],
      sgst: [0],
      igst: [0],
    });

    if (this.data) {
      let values = this.data.split(",");
      console.log(values);
      this.form.patchValue({
        hsnCode: values[0].split("HSN Code:")[1],
        cgst: values[1].split("CGST:")[1],
        sgst: values[2].split("SGST:")[1],
        igst: values[3].split("IGST:")[1],
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
