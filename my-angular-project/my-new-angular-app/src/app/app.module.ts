import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './register/register.component';

import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user.service';
import { AuthService } from './auth.service'; // Import AuthService

import { UploadVideoComponent } from './upload-display/upload-video.component';
import { DisplayVideoComponent } from './upload-display/display-video.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    RegisterComponent,
    UploadVideoComponent, // Dodanie UploadVideoComponent do deklaracji
    DisplayVideoComponent // Dodanie DisplayVideoComponent do deklaracji
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [UserService, AuthService], // Dodanie AuthService jako providera
  bootstrap: [AppComponent]
})
export class AppModule { }
