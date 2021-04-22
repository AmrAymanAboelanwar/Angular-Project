import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { User } from 'src/app/models/user';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {


  blogs:Blog[];
   user:User;
   followingArr:any[];
   follOrUn:string="follow";
   flag:boolean;
  constructor(private serviceUser:UserService ,private router:Router,private blogService:BlogService, private route:ActivatedRoute,private commentService:CommentService) { 
  }

  ngOnInit(): void {

    this.route.params.subscribe(r=>{
 
      this.serviceUser.getUsersProfile(r.id).subscribe(data=>{
        
         this.user =data.result;
         this.blogs=data.Blogs;
          
      })
  
      this.serviceUser.getUser().subscribe(res=>{
        
       this.followingArr = res.result.following;
      
         for(let i=0; i<this.followingArr.length;i++){
               
          if(this.followingArr[i]._id==r.id){
            this.follOrUn="unfollow"
             break;
           }else{
            this.follOrUn="follow"
           }
         }
      });

      
    });


  }

  // get following in side page
     getfollowing(userId:String){
           this.router.navigateByUrl(`view-user/${userId}`);
            this.ngOnInit();
       }





 // follow and un follow
   follow(event:any,id:String){
    if(event.target.innerText==="unfollow"){

      this.serviceUser.unfollow(id).subscribe(r=>{
        console.log(r);
        this.ngOnInit();
      },e=>{
        console.log(e);
      });

    }else{


      this.serviceUser.follow(id).subscribe(r=>{
        this.ngOnInit();
        console.log(r);
      },e=>{
        console.log(e);
      });

    }

   }
}
