import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
 user:User;
 imageURL: string
 selectedFile:File;
 addForm:FormGroup;

  constructor(private router:ActivatedRoute ,private route:Router, private userService:UserService ,private fb:FormBuilder) {

   
      this.userService.getUser().subscribe(data=>{
        this.user = data.result;
        this.addForm=this.fb.group({
          name:[this.user.Name],
          email:[this.user.email],
         });

       this.imageURL="http://localhost:9000/"+this.user.img;
     });
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
    fd.append('Name' , this.addForm.value.name)
    fd.append('email' , this.addForm.value.email)
   }else{
    fd.append('img' , this.selectedFile,this.selectedFile.name)
    fd.append('Name' , this.addForm.value.name)
     fd.append('email' , this.addForm.value.email)
   }
  
   this.userService.editUser(fd).subscribe(data=>{
    this.route.navigate(['user/profile']);
     })

    
  
}
}
