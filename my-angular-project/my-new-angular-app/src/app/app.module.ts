import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component'; // Import HomeComponent

import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

import { UploadVideoComponent } from './upload-display/upload-video.component';
import { DisplayVideoComponent } from './upload-display/display-video.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    RegisterComponent,
    HomeComponent, // Add HomeComponent to declarations
    UploadVideoComponent,
    DisplayVideoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
