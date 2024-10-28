import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { CourseDetailComponent } from './course/course-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PurchaseSuccessComponent } from './purchase-success/purchase-success.component'; // Import nowego komponentu

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'purchase-success', component: PurchaseSuccessComponent }, // Dodana trasa dla sukcesu płatności
  { path: 'privacy-policy', component: PrivacyPolicyComponent }, // Nowa trasa dla polityki prywatności
  { path: 'terms-of-service', component: TermsOfServiceComponent }, // Nowa trasa dla warunków korzystania
  { path: '**', component: PageNotFoundComponent } // Ścieżka "wildcard" na końcu dla obsługi 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
