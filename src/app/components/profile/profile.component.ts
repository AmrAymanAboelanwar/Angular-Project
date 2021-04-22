import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   blogs:Blog[];
   user:User;
   imgUser:String;
  
  constructor(private serviceUser:UserService ,private blogService:BlogService, private router:Router) { 
   
    this.serviceUser.GetUserProfile().subscribe(data=>{
       this.user =data.result;
       this.blogs=data.Blogs;
     
     
       this.imgUser = `http://localhost:9000 ${this.user.img}`;
    })

  }

  ngOnInit(): void {

    


  }

  getfollowingORfollwers(userId:String){
    this.router.navigateByUrl(`/view-user/${userId}`);
   }

   delete(id:String){
     this.blogService.deleteBlog(id).subscribe(r=>{
           
           setTimeout(() => {
            location.reload();
          }, 1000);
     },e=>{
      
     })
   }
}
