import { Component, Inject, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DoctorsService } from "src/app/services/doctors/doctors.service";

@Component({
  selector: "app-doctors-add-edit",
  templateUrl: "./doctors-add-edit.component.html",
  styleUrls: ["./doctors-add-edit.component.scss"],
})
export class DoctorsAddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<DoctorsAddEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private doctorsService: DoctorsService
  ) {}

  ngOnInit(): void {
    this.id = this.data._id;
    this.isAddMode = !this.id;
    console.log("this.isAddMode", this.isAddMode);

    this.form = this.formBuilder.group({
      name: [""],
      contactNumber: [""],
    });

    if (!this.isAddMode) {
      this.doctorsService
        .getDoctors(this.id)
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createDoctor();
    } else {
      this.updateDoctor();
    }
  }

  createDoctor() {
    this.doctorsService.createDoctors(this.form.value).subscribe((response) => {
      this.doAction();
    });
  }

  updateDoctor() {
    this.doctorsService
      .updateDoctors(this.id, this.form.value)
      .subscribe((response) => {
        this.doAction();
      });
  }

  doAction() {
    this.dialogRef.close({ event: "Submit" });
  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancel" });
  }
}
