import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../client';
import { Router } from '@angular/router';
import { ClientService} from '../client.service';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

type user = {
  firstName: string;
  lastName: string;
  email: string;     
  password: string;      
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Input() nom: string;
  @Input() prenom: string;
  @Input() email: string;
  @Input() password: string;
  users: user[]=[];
  cl : Client = new Client();

  constructor(private clientService: ClientService,private router : Router,private apollo: Apollo) { 
    
  }

  ngOnInit() {

  } 
  onSubmit(){
    console.log(this.cl);
    this.apollo.query({
      query: gql`
      query {
        users {
            firstName,
            lastName,
            email,
            password
        }
    }
      `
    })
    .subscribe(result => {
			this.users=result.data['users'];
      console.log(this.users[0].firstName)
			console.log(result.data['users']);
		});
      this.apollo.mutate({
        mutation: gql`
        mutation createUser($nom: String! ,$prenom: String!,$email: String! ,$password: String!  ){
          createUser(firstName:$nom , lastName:$prenom , email:$email , password :$password ){
            user{
              firstName
              lastName
              email
              password
              
            }
          }
        }
        `,
        variables: {
          nom: this.cl.nom,
          prenom: this.cl.prenom,
          email: this.cl.email,
          password: this.cl.password,
        },
      }).subscribe(result => {
  
        this.users=result.data["createUser"];
        if(result.data["createUser"]==null){
          // alert("bobo");}
          Swal.fire({
             
            title: 'Error!',
            text: 'Email ou Password Invalid',
            icon: 'info',
            confirmButtonText: 'ok'
            
      
          });}
          else{
           // localStorage.setItem("emailcl" , this.cl.email)
           localStorage.setItem("lastName" , this.cl.nom)
       localStorage.setItem("firstName" , this.cl.prenom)
       this.clientService.loginAdmin(this.cl)
          this.router.navigate(['/Articles'])
    
      }  }),
        error => console.log(error);
       }
}