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

import { FlexLayoutModule } from "@angular/flex-layout";
import { AddProfileComponent } from "./profile/add-profile/add-profile.component";
import { MedicineTypesComponent } from "./medicine-types/medicine-types.component";
import { MedicineTypesAddEditComponent } from './medicine-types/medicine-types-add-edit/medicine-types-add-edit.component';
import { StocksComponent } from './stocks/stocks.component';
import { StocksAddEditComponent } from './stocks/stocks-add-edit/stocks-add-edit.component';
import { DealerInfoComponent } from './stocks/dealer-info/dealer-info.component';
import { GstInfoComponent } from './stocks/gst-info/gst-info.component';

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
