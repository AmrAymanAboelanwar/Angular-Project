import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blog:Blog;
  imageURL: string
  selectedFile:File;
  addForm:FormGroup;
  msg:string|null=null;
  constructor(private router:ActivatedRoute,private route:Router , private blogService:BlogService ,private fb:FormBuilder) {

   router.params.subscribe(d=>{

    this.blogService.getBlog(d.id).subscribe(data=>{
      this.blog=data;
     
       this.addForm=this.fb.group({
           title:[this.blog.title],
           body:[this.blog.body],
        });
            this.imageURL="http://localhost:9000/"+this.blog.img;
   });

   })

}
  ngOnInit(): void {
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


 onSubmit(){
   const fd=new FormData();
   if(this.selectedFile==undefined){
    fd.append('title' , this.addForm.value.title)
    fd.append('body' , this.addForm.value.body)
   }else{
     fd.append('img' , this.selectedFile,this.selectedFile.name)
     fd.append('title' , this.addForm.value.title)
     fd.append('body' , this.addForm.value.body)
   }
     this.blogService.editBlog(this.blog._id,fd).subscribe(data=>{
      
      this.route.navigate(['user/profile']);

     });
  

  }
}