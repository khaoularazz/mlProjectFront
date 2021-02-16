import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedin : any;
  constructor(private authadmin :ClientService ,private router : Router) { }
  logout(){
    this.loggedin=false;
 
  }
  ngOnInit() {

    this.authadmin.l.subscribe((value) =>{ 
      this.loggedin=value;
     console.log(this.loggedin)
  })}

}
