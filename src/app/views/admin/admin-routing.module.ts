import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { MedicineTypesComponent } from "./medicine-types/medicine-types.component";
import { StocksComponent } from "./stocks/stocks.component";
import { StocksAddEditComponent } from "./stocks/stocks-add-edit/stocks-add-edit.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "profile",
    component: ProfileComponent,
    pathMatch: "full",
  },
  {
    path: "types",
    component: MedicineTypesComponent,
    pathMatch: "full",
  },
  {
    path: "stocks",
    component: StocksComponent,
    pathMatch: "full",
  },
  {
    path: "stocks/add",
    component: StocksAddEditComponent,
    pathMatch: "full",
  },
  {
    path: "stocks/edit/:id",
    component: StocksAddEditComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
