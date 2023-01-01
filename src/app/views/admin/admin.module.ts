import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { AdminRoutingModule } from "./admin-routing.module";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { AboutComponent } from "./about/about.component";

//Material Modules
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";

import { FlexLayoutModule } from "@angular/flex-layout";
import { AddProfileComponent } from "./profile/add-profile/add-profile.component";
import { MedicineTypesComponent } from "./medicine-types/medicine-types.component";
import { MedicineTypesAddEditComponent } from "./medicine-types/medicine-types-add-edit/medicine-types-add-edit.component";
import { StocksComponent } from "./stocks/stocks.component";
import { StocksAddEditComponent } from "./stocks/stocks-add-edit/stocks-add-edit.component";
import { DealerInfoComponent } from "./stocks/dealer-info/dealer-info.component";
import { GstInfoComponent } from "./stocks/gst-info/gst-info.component";
import { BillsComponent } from "./bills/bills.component";
import { NewBillComponent } from "./bills/new-bill/new-bill.component";
import { AddItemComponent } from "./bills/add-item/add-item.component";
import { PaymentInfoComponent } from "./bills/payment-info/payment-info.component";

const matModules = [
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDividerModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  FormsModule,
  MatRadioModule,
];

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    AboutComponent,
    AddProfileComponent,
    MedicineTypesComponent,
    MedicineTypesAddEditComponent,
    StocksComponent,
    StocksAddEditComponent,
    DealerInfoComponent,
    GstInfoComponent,
    BillsComponent,
    NewBillComponent,
    AddItemComponent,
    PaymentInfoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    FlexLayoutModule,
    ...matModules,
  ],
})
export class AdminModule {}
