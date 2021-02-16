import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from './client.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authadmin :ClientService ,private router : Router){

  }
  title = 'mlProject';


}
