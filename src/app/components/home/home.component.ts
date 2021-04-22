import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { User } from 'src/app/models/user';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs:Blog[];
  flag:boolean=false;  
  user:User;
  f:boolean;
  constructor(private serviceUser:BlogService , private router:Router,private commentService:CommentService) { 

    
       this.user=JSON.parse(localStorage.getItem('user')||'');

       this.serviceUser.GetFollowingBlogs().subscribe(
        data=>{
         this.blogs=data.data;
          this.flag=true;
        }
       );
       
     
  }


  ngOnInit(): void {

    if(!localStorage.getItem('load')){
         localStorage.setItem('load','no');
         location.reload();
    } else{
      localStorage.removeItem('load')
    }

  }

}
