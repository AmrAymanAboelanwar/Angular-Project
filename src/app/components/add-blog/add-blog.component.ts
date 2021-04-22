import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  imageURL: string;
  selectedFile:File;
  addForm:FormGroup;
  user:User;
  msg:String;
  constructor(private fb:FormBuilder , private blogService:BlogService) { 
    this.user=JSON.parse(localStorage.getItem('user')||'');
   
    this.addForm=this.fb.group({
      title:[''],
      body:[''],
     });

  }

  ngOnInit(): void {}

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


     this.blogService.addBlog(fd).subscribe(data=>{
       this.msg = "you Blog is addes sucessfully";
       setTimeout(() => {
         location.reload();
       }, 3000);
     })
 
}





}
