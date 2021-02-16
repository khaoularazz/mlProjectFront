import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


import {HomeComponent} from './home/home.component'
import {FakenewsComponent} from './fakenews/fakenews.component'
import {TokenizationComponent} from './tokenization/tokenization.component'

const routes: Routes = [
{ path : 'Login' , component : LoginComponent} ,

{path : 'Registration' , component : RegistrationComponent } ,




{path : 'Home' , component :  HomeComponent} ,
{path : 'Articles' , component :  FakenewsComponent} ,
{path : 'NLPServices' , component :  TokenizationComponent} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

