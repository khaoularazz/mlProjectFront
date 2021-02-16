import { Component, Input, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
type article = {
  id: string;
  text: string;
  username: string;
  comments : []
  state   :[] 
  textstate:number
  
     
            
}

@Component({
  selector: 'app-fakenews',
  templateUrl: './fakenews.component.html',
  styleUrls: ['./fakenews.component.css']
})
export class FakenewsComponent implements OnInit {
  @Input() id: string;
  @Input() comment: string;
  @Input() text: string;
  @Input() nom: string;

  articles: article[]=[];
  //comment :boolean=false;
  value:any=[]
  hh=0;
 	constructor(private apollo: Apollo,private router : Router)  {
   // this.nom =  this.router.getCurrentNavigation().extras.state.firstName;
    this.nom=localStorage.getItem('firstName');
    this.nom=this.nom+" "+localStorage.getItem('lastName');
    console.log(this.nom)
   }

  ngOnInit() {
    



    this.apollo.query({
      query: gql`
      query {
        articles{
          id
          text
          textstate
          username
          comments
          state
         
        }
        }
      `
    })
    .subscribe(result => {
			this.articles=result.data['articles'];
      console.log(this.articles[0].text)
			console.log(result.data['articles']);
		});
  

  }
  btn_post(b: any , bb:any){
    
   /* this.comment=true

    console.log(b);
    if(b=="lokmlkuh1")
    this.comments.push(bb);
    if(b=="ffffjknh54")
    this.comments1.push(bb);
    if(b=="3ilnjlk,f54f")
    this.comments2.push(bb);
    
    bb='';
    this.hh=this.comments.length*/
this.id=b;
this.comment=bb;
    this.apollo.mutate({
      mutation: gql`
      mutation updateArticle($id: String! ,$comment: String! ){
        updateArticle(idAr:$id,comment :$comment){
          article{
            id
            text
            textstate
            username
            comments
            state
           
          }
        }
      }
      `,
      variables: {
        id: this.id,
        comment: this.comment
      },
    }).subscribe(result => {
			
    
			console.log(result.data);
      this.apollo.query({
        query: gql`
        query {
          articles{
            id
            text
            textstate
            username
            comments
            state
           
          }
          }
        `
      })
      .subscribe(result => {
        this.articles=result.data['articles'];
        console.log(this.articles[0].text)
        console.log(result.data['articles']);
      });

    });
    
 
  
  }
  btn_article_post(text: any ){
    this.text=text;
    /* this.comment=true
 
     console.log(b);
     if(b=="lokmlkuh1")
     this.comments.push(bb);
     if(b=="ffffjknh54")
     this.comments1.push(bb);
     if(b=="3ilnjlk,f54f")
     this.comments2.push(bb);
     
     bb='';
     this.hh=this.comments.length*/
     this.nom=localStorage.getItem('firstName');
    this.nom=this.nom+" "+localStorage.getItem('lastName');
 console.log(text);
 this.text=text
     this.apollo.mutate({
       mutation: gql`
       mutation createArticle($text: String!,$nom: String! ){
        createArticle(text:$text,username:$nom){
           article{
             id
             text
             textstate
             username
             comments
             state
           }
         }
       }
       `,
       variables: {
         text: this.text,
         nom: this.nom,
         
       },
     }).subscribe(result => {
      console.log(this.articles)
       console.log(result.data);
       this.apollo.watchQuery({
         query: gql`
         query {
           articles{
             id
             text
             textstate
             username
             comments
             state
            
           }
           }
         `, fetchPolicy :'network-only'
       }).valueChanges.pipe(map (res =>res.data))
       .subscribe(result => {
         this.articles=result['articles'];
         console.log(this.articles)
         console.log(result['articles']);
         
       });
 
     });
    
     
  
   
   }

}
