import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {


  base:String="http://localhost:9000/comment/"
  constructor(private http:HttpClient) { }
  token:string=JSON.stringify(localStorage.getItem("access_token"));
       httpOptions={ headers:new HttpHeaders({
       'Authorization':JSON.parse(this.token),
     
    })}


  // add comment

  AddComment(id:String,comment:FormData){
    debugger;
    return this.http.post<any>(`${this.base}add/${id}`,comment,this.httpOptions); 
  }
  // get comments

  

  getComments(id:String){
    return this.http.get<any>(`${this.base}get/${id}`,this.httpOptions); 
  }

}
