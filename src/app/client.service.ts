import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public v = new Subject<boolean>();
  public l=new Subject<boolean>();

  constructor(private httpClient : HttpClient) { }


  loginAdmin(cl : Client):Observable<Object>{
    
           
            this.l.next(true);
            console.log(this.l); 
     
     return this.l
  
  }
 
  navigate(){
    this.v.next(false)
  }


}