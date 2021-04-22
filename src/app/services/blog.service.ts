import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  base:String="http://localhost:9000/blog/"
  constructor(private http:HttpClient) { }
  token:string=JSON.stringify(localStorage.getItem("access_token"));
     httpOptions={ headers:new HttpHeaders({
       'Authorization':JSON.parse(this.token),
    })}
    
    

  // get blog by id
  getBlog(id:String){
    return this.http.get<Blog>(`${this.base}/${id}`); 
  }

  // add blog

  addBlog(blog:FormData){
    return this.http.post<Blog>(`${this.base}add`,blog,this.httpOptions); 
  }

  // edit blog 
  editBlog(id:String,blog:FormData){
    return this.http.patch<Blog>(`${this.base}edit/${id}`,blog,this.httpOptions); 
  }


  // delete blog

  deleteBlog(id:String){
   
    return this.http.delete<any>(`${this.base}delete/${id}`,this.httpOptions);
  }


  //home
  GetFollowingBlogs(){
    return this.http.get<any>(`http://localhost:9000/user/following`,this.httpOptions); 
  }


  // getAllBlogs

 
  getAllBlogs(){
    return this.http.get<any>(`${this.base}/getAll`); 
  }


}


