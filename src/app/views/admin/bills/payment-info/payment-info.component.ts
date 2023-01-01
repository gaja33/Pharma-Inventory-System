import { Component, Inject, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-payment-info",
  templateUrl: "./payment-info.component.html",
  styleUrls: ["./payment-info.component.scss"],
})
export class PaymentInfoComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  paymentStatus: string = "completed";
  paymentMode: string;
  balance: number = 0;

  constructor(
    public dialogRef: MatDialogRef<PaymentInfoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: [null],
    });

    if (this.data) {
      console.log(this.data);
      this.form.patchValue({ amount: this.data });
    }

    this.form.controls["amount"].valueChanges.subscribe((value) => {
      this.balance = value - this.data;
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value, this.paymentMode);
    this.doAction();
  }

  doAction() {
    this.dialogRef.close({
      event: "Submit",
      data: {
        amount: this.form.value.amount,
        balance: this.balance,
        paymentMode: this.paymentMode,
      },
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancel" });
  }
}
