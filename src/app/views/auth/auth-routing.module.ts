import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";

import { SigninComponent } from "./signin/signin.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/signin",
    pathMatch: "full",
  },
  {
    path: "signin",
    component: SigninComponent,
    pathMatch: "full",
  },
  {
    path: "register",
    component: RegisterComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
