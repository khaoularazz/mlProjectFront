import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { MatNativeDateModule , MatDatepickerModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { FakenewsComponent } from './fakenews/fakenews.component';
import { TokenizationComponent } from './tokenization/tokenization.component';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {HttpLinkModule} from 'apollo-angular-link-http';
import { GraphQLModule } from './graphql.module';
import {InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {  Apollo } from 'apollo-angular';


export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri: 'http://127.0.0.1:5000/graphql'}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,

    RendezVousComponent,
    HomeComponent,
    FakenewsComponent,
    TokenizationComponent,

  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule ,
    HttpLinkModule,

    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule ,
    MatDatepickerModule ,
    MatNativeDateModule,
    GraphQLModule ,
 

  ], 
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
    
  },LoginComponent
],
  
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})

export class AppModule {
 }
