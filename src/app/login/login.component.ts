import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService} from '../client.service'
import { Client } from '../client';
import Swal from 'sweetalert2';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

type user = {
  firstName: string;
  lastName: string;
  email: string;     
  password: string;      
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public l=new Subject<boolean>();
  @Input() email: string;

  users: user[]=[];
  user: user;
  cl :Client =new Client();
   b  : any;
  constructor(private clientService: ClientService,private router : Router,private apollo: Apollo) { 
    
  }

  ngOnInit() {
   
  }
  
  

  onSubmit():Observable<Object>{

  console.log(this.cl.email);
  this.apollo.query({
    query: gql`
    query  ($email: String!,$password: String!) {
       user (email:$email, password:$password){
          firstName,
          lastName,
          email,
          password
      }
  }
    `
    ,
    variables: {
      email: this.cl.email,
      password: this.cl.password,
    },
  })
  .subscribe(result => {
    this.user=result.data['user'];
  
    if(result.data["user"]==null){
      // alert("bobo");}
      Swal.fire({
         
        title: 'Error!',
        text: 'Email ou Password Invalid',
        icon: 'info',
        confirmButtonText: 'ok'
        
  
      });}
      else{
       // localStorage.setItem("emailcl" , this.cl.email)
       localStorage.setItem("firstName" , this.user.firstName)
       localStorage.setItem("lastName" , this.user.lastName)
       this.clientService.loginAdmin(this.cl)
      this.router.navigate(['/Articles'] , { state: {firstName : this.user.firstName }});

  }  })

    return this.l;
  }
}
