import { Component, Input, OnInit } from '@angular/core';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ClientService } from '../client.service';
type text = {
  text: string;
  result: [];
      
}
@Component({
  selector: 'app-tokenization',
  templateUrl: './tokenization.component.html',
  styleUrls: ['./tokenization.component.css']
})
export class TokenizationComponent implements OnInit {
text:text;
result:[];
nlp: number;
@Input() txt:string
 
  constructor(private clientService: ClientService,private apollo: Apollo) { }

  ngOnInit() {
    
    this.clientService.navigate() 
  }
onTokenize(){
  this.nlp=0;
  this.apollo.mutate({
    mutation: gql`
    mutation tokenize($txt: String! ){
      tokenize(text:$txt  ){
        tokenize{
          text
          result
          
        }
      }
    }
    `,
    variables: {
      txt: this.txt
     
    },
  }).subscribe(result => {
    this.text=result.data["tokenize"]["tokenize"];
this.result=this.text.result;
     })
}
onStemming(){
  this.nlp=1;
  this.apollo.mutate({
    mutation: gql`
    mutation stemming($txt: String! ){
      stemming(text:$txt  ){
        stemming{
          text
          result
          
        }
      }
    }
    `,
    variables: {
      txt: this.txt
     
    },
  }).subscribe(result => {
    this.text=result.data["stemming"]["stemming"];
this.result=this.text.result;
     })
}
onLemmatization(){
  this.nlp=1;
  this.apollo.mutate({
    mutation: gql`
    mutation lemmatization($txt: String! ){
      lemmatization(text:$txt  ){
        lemmatization{
          text
          result
          
        }
      }
    }
    `,
    variables: {
      txt: this.txt
     
    },
  }).subscribe(result => {
    this.text=result.data["lemmatization"]["lemmatization"];
this.result=this.text.result;
console.log(this.text)
     })
}

onPos(){
  this.nlp=1;
  this.apollo.mutate({
    mutation: gql`
    mutation postaging($txt: String! ){
      postaging(text:$txt  ){
        postaging{
          text
          result
          
        }
      }
    }
    `,
    variables: {
      txt: this.txt
     
    },
  }).subscribe(result => {
    this.text=result.data["postaging"]["postaging"];
this.result=this.text.result;
     })
}
onStopwords(){
  this.nlp=2;
  this.apollo.mutate({
    mutation: gql`
    mutation stopwords($txt: String! ){
      stopwords(text:$txt  ){
        stopwords{
          text
          result
          
        }
      }
    }
    `,
    variables: {
      txt: this.txt
     
    },
  }).subscribe(result => {
    this.text=result.data["stopwords"]["stopwords"];
this.result=this.text.result;
     })
}
onTfidf(){
  this.nlp=1;
  this.apollo.mutate({
    mutation: gql`
    mutation tfidf($txt: String! ){
      tfidf(text:$txt  ){
        tfidf{
          text
          result
          
        }
      }
    }
    `,
    variables: {
      txt: this.txt
     
    },
  }).subscribe(result => {
    this.text=result.data["tfidf"]["tfidf"];
this.result=this.text.result;
     })
}
onBagofwords(){
  this.nlp=1;
  this.apollo.mutate({
    mutation: gql`
    mutation bagofwords($txt: String! ){
      bagofwords(text:$txt  ){
        bagofwords{
          text
          result
          
        }
      }
    }
    `,
    variables: {
      txt: this.txt
     
    },
  }).subscribe(result => {
    this.text=result.data["bagofwords"]["bagofwords"];
this.result=this.text.result;
     })
}
}
