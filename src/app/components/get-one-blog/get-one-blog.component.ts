import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from "jquery";
import { Blog } from 'src/app/models/blog';
import { Comment } from 'src/app/models/comment';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-get-one-blog',
  templateUrl: './get-one-blog.component.html',
  styleUrls: ['./get-one-blog.component.css']
})
export class GetOneBlogComponent implements OnInit {
   blog:Blog|null=null;
   comments:Comment[];
   imageURL: string
   selectedFile:File;
   commentform:FormGroup;
  constructor(private fb:FormBuilder,private router:ActivatedRoute,private blogService:BlogService , private commentService:CommentService) {
    

    this.commentform=this.fb.group({
      comment:[''],
    });
  }


  ngOnInit(): void {
    this.router.params.subscribe(r=>{
      this.blogService.getBlog(r.id).subscribe(data=>{
        this.blog = data;
      });
    
      this.commentService.getComments(r.id).subscribe(data=>{
       this.comments= data;
      

      });
 
     })

  }
  onsubmit(id:String){
 
    const fd = new FormData();
    if(this.selectedFile==undefined){
     fd.append('text',this.commentform.value.comment);
    }else{
      fd.append('text',this.commentform.value.comment);
    fd.append('img' , this.selectedFile,this.selectedFile.name);
    }
    debugger;
    this.commentService.AddComment(id,fd).subscribe(d=>{
      this.ngOnInit();
      console.log(d);
    })
   }




      
  onFileSelect(event:any) {
    this.selectedFile =<File> event.target.files[0];
  

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.selectedFile )
  }


}
