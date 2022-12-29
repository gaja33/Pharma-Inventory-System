import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { MedicineTypes } from "src/app/models/medicine-types/medicine-types.model";
import { MedicineTypesService } from "src/app/services/medicine-types/medicine-types.service";
import { StocksService } from "src/app/services/stocks/stocks.service";
import { DealerInfoComponent } from "../dealer-info/dealer-info.component";
import { GstInfoComponent } from "../gst-info/gst-info.component";

@Component({
  selector: "app-stocks-add-edit",
  templateUrl: "./stocks-add-edit.component.html",
  styleUrls: ["./stocks-add-edit.component.scss"],
})
export class StocksAddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  types: MedicineTypes[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private stocksService: StocksService,
    private medicineTypes: MedicineTypesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      companyName: ["", Validators.required],
      type: ["", Validators.required],
      batch: ["", Validators.required],
      mfgDate: [""],
      expDate: ["", Validators.required],
      pricePerPkgOrStrip: [null, Validators.required],
      itemsInPkgOrStrip: [null, Validators.required],
      qty: [null, Validators.required],
      looseQty: [0, Validators.required],
      shelfName: [""],
      dealerInfo: [""],
      gstHsnInfo: [""],
    });

    if (!this.isAddMode) {
      this.stocksService.getStocks(this.id).subscribe((x) => {
        console.log(x);
        this.form.patchValue(x);
        this.form
          .get("dealerInfo")
          .setValue(
            `Name:${x.dealerInfo.name ? x.dealerInfo.name : "NA"}, Number:${
              x.dealerInfo.contactNumber ? x.dealerInfo.contactNumber : "NA"
            }`
          );
        this.form
          .get("gstHsnInfo")
          .setValue(
            `HSN Code:${
              x.gstHsnInfo.hsnCode ? x.gstHsnInfo.hsnCode : "NA"
            }, CGST:${x.gstHsnInfo.cgst ? x.gstHsnInfo.cgst : 0}, SGST:${
              x.gstHsnInfo.sgst ? x.gstHsnInfo.sgst : 0
            }, IGST:${x.gstHsnInfo.igst ? x.gstHsnInfo.igst : 0}`
          );
      });
    }

    this.getTypes();
  }

  getTypes() {
    this.medicineTypes
      .getAllMedicineTypes()
      .subscribe((resp: MedicineTypes[]) => {
        this.types = resp;
      });
  }

  openDealerInfoDialog(obj?) {
    console.log(obj);
    const dialogRef = this.dialog.open(DealerInfoComponent, {
      data: this.form.get("dealerInfo").value,
      disableClose: true,
      width: "25%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result:`, result);
      if (result.event == "Submit" || result.event == "Update") {
        //this.getMedecineTypes();
        this.form
          .get("dealerInfo")
          .setValue(
            `Name:${result.data.name ? result.data.name : "NA"}, Number:${
              result.data.contactNumber ? result.data.contactNumber : "NA"
            }`
          );
      }
    });
  }

  openGSTInfoDialog(obj?) {
    console.log(obj);
    const dialogRef = this.dialog.open(GstInfoComponent, {
      data: this.form.get("gstHsnInfo").value,
      disableClose: true,
      width: "25%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result:`, result);
      if (result.event == "Submit" || result.event == "Update") {
        //this.getMedecineTypes();
        this.form
          .get("gstHsnInfo")
          .setValue(
            `HSN Code:${
              result.data.hsnCode ? result.data.hsnCode : "NA"
            }, CGST:${result.data.cgst ? result.data.cgst : 0}, SGST:${
              result.data.sgst ? result.data.sgst : 0
            }, IGST:${result.data.igst ? result.data.igst : 0}`
          );
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    let dealerInfo = this.form.get("dealerInfo").value.split(",");
    let gstInfo = this.form.get("gstHsnInfo").value.split(",");
    this.form.value.dealerInfo = {
      name: dealerInfo[0].split("Name:")[1],
      contactNumber: parseInt(dealerInfo[1].split("Number:")[1]),
    };
    this.form.value.gstHsnInfo = {
      hsnCode: gstInfo[0].split("HSN Code:")[1],
      cgst: parseInt(gstInfo[1].split("CGST:")[1]),
      sgst: parseInt(gstInfo[2].split("SGST:")[1]),
      igst: parseInt(gstInfo[3].split("IGST:")[1]),
    };
    console.log(this.form.value);
    if (this.isAddMode) {
      this.createStock();
    } else {
      this.updateStock();
    }
  }

  createStock() {
    this.stocksService.createStocks(this.form.value).subscribe((response) => {
      this.router.navigate(["/admin/stocks"]);
    });
  }

  updateStock() {
    this.stocksService
      .updateStocks(this.id, this.form.value)
      .subscribe((response) => {
        this.router.navigate(["/admin/stocks"]);
      });
  }
}
