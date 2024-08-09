import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  // Dodaj inne ścieżki według potrzeb, ale upewnij się, że inne komponenty nie są ładowane na /register
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Ustaw domyślną ścieżkę
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
