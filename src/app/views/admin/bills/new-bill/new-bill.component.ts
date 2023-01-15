import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AddItemComponent } from "../add-item/add-item.component";
import * as moment from "moment";
import { SalesService } from "src/app/services/sales/sales.service";
import { PaymentInfoComponent } from "../payment-info/payment-info.component";
import { ProfileService } from "src/app/services/profile/profile.service";
import { DoctorsService } from "src/app/services/doctors/doctors.service";
import { Doctors } from "src/app/models/doctors/doctors.model";

@Component({
  selector: "app-new-bill",
  templateUrl: "./new-bill.component.html",
  styleUrls: ["./new-bill.component.scss"],
})
export class NewBillComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  billId: string;
  billDate: string = moment().format("DD/MM/YYYY");
  Items = [];
  totalTax: number = 0;
  totalDiscount: number = 0;
  totalAmount: number = 0;
  ProfileData: any;
  doctors: Doctors[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private salesService: SalesService,
    private profileService: ProfileService,
    private doctorsService: DoctorsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      billId: [""],
      billDate: [""],
      patientInfo: this.formBuilder.group({
        name: [""],
        contactNumber: [""],
      }),
      doctorInfo: this.formBuilder.group({
        name: [""],
        contactNumber: [""],
      }),
      totalAmt: [""],
      tax: [""],
      discount: [""],
      balance: [""],
      paidAmt: [""],
      paymentMode: [""],
      items: [[]],
    });

    if (this.isAddMode) {
      this.profileService
        .getProfile(sessionStorage.getItem("storeId"))
        .subscribe((resp) => {
          if (resp) {
            this.ProfileData = resp;
            this.billId = this.generateBillId(
              resp.previousBillCount + 1,
              resp.billPrefix
            );
          }
        });
    }

    if (!this.isAddMode) {
      this.salesService.getSales(this.id).subscribe((x) => {
        console.log(x);
        this.form.patchValue(x);
        this.Items = x.items;
        this.addTotalTax();
        this.calculateTotalDiscount();
        this.calculateTotalAmount();
        this.billId = x.billId;
      });
    }

    this.getDoctors();
  }

  getDoctors() {
    this.doctorsService.getAllDoctors().subscribe((resp: Doctors[]) => {
      this.doctors = resp;
    });
  }

  patchDoctor(value) {
    console.log(value.value);
    let number = this.doctors.find(
      (item) => item.name === value.value
    ).contactNumber;
    console.log(number);
    this.form.get("doctorInfo.contactNumber").setValue(number);
  }

  generateBillId(num, billPrefix) {
    return billPrefix + "_" + num.toString().padStart(4, "0");
  }

  openAddItem() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      disableClose: true,
      width: "25%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result:`, result);
      if (result.event == "Submit" || result.event == "Update") {
        this.Items.push(result.data);
        this.addTotalTax();
        this.calculateTotalDiscount();
        this.calculateTotalAmount();
      }
    });
  }

  openPaymentInfoDialog(obj?) {
    console.log(obj);
    const dialogRef = this.dialog.open(PaymentInfoComponent, {
      data: this.totalAmount,
      disableClose: true,
      width: "25%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result:`, result);
      if (result.event == "Submit" || result.event == "Update") {
        this.form.value.paidAmt = result.data.amount;
        this.form.value.balance = result.data.balance;
        this.form.value.paymentMode = result.data.paymentMode;
        console.log(this.form.value);
        if (this.isAddMode) {
          this.createSales();
          this.ProfileData.previousBillCount = parseInt(
            this.billId.split("_")[1]
          );
          this.profileService
            .updateProfile(this.ProfileData._id, this.ProfileData)
            .subscribe();
        } else {
          this.updateSales();
        }
      }
    });
  }

  deleteItem(index) {
    this.Items.splice(index, 1);
    this.addTotalTax();
    this.calculateTotalDiscount();
    this.calculateTotalAmount();
  }

  calculateGST(gst, item) {
    let gstAmt = (this.calculateAmount(item) * gst) / 100;
    return gstAmt;
  }

  calculateDiscount(discount, amt) {
    return (amt * discount) / 100;
  }

  calculateAmount(item) {
    return (
      item.qty * item.itemDetails.pricePerItem -
      this.calculateDiscount(
        item.discount,
        item.qty * item.itemDetails.pricePerItem
      )
    );
  }

  updateTax(item) {
    this.addTotalTax();
    this.calculateTotalDiscount();
    this.calculateTotalAmount();
  }

  addTotalTax() {
    this.Items.forEach((item) => {
      item["totalTax"] =
        this.calculateGST(item.itemDetails.gstHsnInfo.cgst, item) +
        this.calculateGST(item.itemDetails.gstHsnInfo.sgst, item);
    });
    this.calculateTotalTax();
  }

  calculateTotalTax() {
    this.totalTax = 0;
    this.Items.forEach((item) => {
      this.totalTax = this.totalTax + item.totalTax;
    });
  }

  calculateTotalDiscount() {
    this.totalDiscount = 0;
    this.Items.forEach((item) => {
      this.totalDiscount =
        this.totalDiscount +
        this.calculateDiscount(
          item.discount,
          item.qty * item.itemDetails.pricePerItem
        );
    });
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.Items.forEach((item) => {
      this.totalAmount = this.totalAmount + this.calculateAmount(item);
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.form.get("billId").setValue(this.billId);
    this.form.get("billDate").setValue(this.billDate);
    this.form.get("totalAmt").setValue(this.totalAmount);
    this.form.get("tax").setValue(this.totalTax);
    this.form.get("discount").setValue(this.totalDiscount);
    this.form.get("items").setValue(this.Items);

    this.loading = true;
    console.log(this.form.value);
    this.openPaymentInfoDialog();
  }

  createSales() {
    this.salesService.createSales(this.form.value).subscribe((response) => {
      this.router.navigate(["/admin/bills"]);
    });
  }

  updateSales() {
    this.salesService
      .updateSales(this.id, this.form.value)
      .subscribe((response) => {
        this.router.navigate(["/admin/bills"]);
      });
  }
}
