import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { StocksService } from "src/app/services/stocks/stocks.service";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"],
})
export class AddItemComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  filteredOptions: [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddItemComponent>,
    private stocksService: StocksService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      itemName: ["", Validators.required],
      qty: [null, Validators.required],
      discount: [0],
      itemDetails: [{}],
    });

    this.form.controls["itemName"].valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((result) => {
        this.stocksService.searchStocks(result).subscribe((resp) => {
          console.log(resp);
          this.filteredOptions = resp;
        });
      });
  }

  selected(opt) {
    this.form.get("itemDetails").setValue(opt);
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
