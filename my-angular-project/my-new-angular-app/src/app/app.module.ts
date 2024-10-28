import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { AuthButtonComponent } from './auth-button.component';
import { UserProfileComponent } from './user-profile.component';
import { CourseDetailComponent } from './course/course-detail.component';
import { CourseListComponent } from './course/course-list.component';
import { CourseComponent } from './course/course.component';
import { PurchaseComponent } from './purchase.component';
import { AuthModule } from '@auth0/auth0-angular';
import { StripeService } from './stripe.service';
import { environment } from './environment';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PurchaseSuccessComponent } from './purchase-success/purchase-success.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AuthButtonComponent,
    UserProfileComponent,
    CourseDetailComponent,
    CourseListComponent,
    CourseComponent,
    PurchaseComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    PurchaseSuccessComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-57jkjs2ee3xsxr14.eu.auth0.com',
      clientId: 'WJb8Rhs0AzRLclnOWM4PxRA7NNBBXNps',
      authorizationParams: {
        audience: 'https://dev-57jkjs2ee3xsxr14.eu.auth0.com/api/v2/', // Dodaj audience
        redirect_uri: `${environment.frontendUrl}/dashboard`
      }
    }),
  ],
  providers: [
    AuthGuard,
    StripeService,
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
