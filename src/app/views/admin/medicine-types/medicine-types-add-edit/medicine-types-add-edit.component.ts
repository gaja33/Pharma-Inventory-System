import { Component, Inject, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MedicineTypesService } from "src/app/services/medicine-types/medicine-types.service";

@Component({
  selector: "app-medicine-types-add-edit",
  templateUrl: "./medicine-types-add-edit.component.html",
  styleUrls: ["./medicine-types-add-edit.component.scss"],
})
export class MedicineTypesAddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<MedicineTypesAddEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private medicineTypesService: MedicineTypesService
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.id = this.data._id;
    this.isAddMode = !this.id;
    console.log("this.isAddMode", this.isAddMode);

    this.form = this.formBuilder.group({
      typeName: [""],
    });

    if (!this.isAddMode) {
      this.medicineTypesService
        .getMedicineTypes(this.id)
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
      this.createMedicineType();
    } else {
      this.updateMedicineType();
    }
  }

  createMedicineType() {
    this.medicineTypesService
      .createMedicineTypes(this.form.value)
      .subscribe((response) => {
        this.doAction();
      });
  }

  updateMedicineType() {
    this.medicineTypesService
      .updateMedicineTypes(this.id, this.form.value)
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
