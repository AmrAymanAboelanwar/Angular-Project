import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog } from '../models/blog';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  base:String="http://localhost:9000/user/"
  constructor(private http:HttpClient) { }
  token:string=JSON.stringify(localStorage.getItem("access_token"));
  httpOptions={ headers:new HttpHeaders({
       'Authorization':JSON.parse(this.token),
     
    })};



  // user profile
  GetUserProfile(){
   
    return this.http.get<any>(`${this.base}profile`,this.httpOptions); 
  }
  
  // get user that login now

  getUser(){
    return this.http.get<any>(`${this.base}`,this.httpOptions); 
  }


  //get users profile

  

  getUsersProfile(id:string){
    return this.http.get<any>(`${this.base}get/${id}`,this.httpOptions); 
  }

  //search
  search(val:string){
    return this.http.get<any>(`${this.base}search?name=${val}`,this.httpOptions); 
  }

  editUser(data:FormData){
    return this.http.patch<any>(`${this.base}`,data,this.httpOptions); 
  }
  //register
  CreateUser(user:FormData){
    return this.http.post<User>(`${this.base}register`,user);
  }
  //login
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.base}login`, {username: username, password: password})
      .pipe(
        map(result => {
      
          localStorage.setItem('access_token', result.data.token);
          localStorage.setItem('user', JSON.stringify(result.data));
          
          return true;
         
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    
  }
  
  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  


  //follow

  follow(id:String){
    return this.http.post<any>(`${this.base}follow/${id}`,null,this.httpOptions);
  }

  unfollow(id:String){
    return this.http.post<any>(`${this.base}unfollow/${id}`,null,this.httpOptions);
  }
}
