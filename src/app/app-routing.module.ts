import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SideMainNavComponent } from "./layouts/side-main-nav/side-main-nav.component";
import { AuthGuardService } from "./services/auth-gaurd/auth-gaurd.service";
import { AuthenticationService } from "./services/authentication/authentication.service";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./views/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "admin",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./views/admin/admin.module").then((m) => m.AdminModule),
      },
    ],
    component: SideMainNavComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationService, AuthGuardService],
})
export class AppRoutingModule {}
