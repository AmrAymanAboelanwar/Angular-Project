import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 regform:FormGroup;
 user:User;
 img:string="/assets/reg2.PNG";
 error:string|null=null;
 accepted:string|null=null;


 imageURL: string
 selectedFile:File;
 

  constructor(private fb:FormBuilder,private userservice:UserService,private router:Router) { 

    this.regform=this.fb.group({
      UserName:['',[Validators.required,Validators.minLength(3)]],
      Name:['',[Validators.required,Validators.minLength(3)]],
      Password:['',[Validators.required,Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      Email:['',[Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]]

    });
    this.imageURL="/assets/person.jpg";
    
  }

  ngOnInit(): void {
    
  }



  onsubmit(){

   const fd = new FormData();
  



   if(this.selectedFile==undefined){
    fd.append('username',this.regform.value.UserName);
   fd.append('password',this.regform.value.Password);
   fd.append('Name',this.regform.value.Name);
   fd.append('email',this.regform.value.Email);
  
   }else{
    fd.append('username',this.regform.value.UserName);
   fd.append('password',this.regform.value.Password);
   fd.append('Name',this.regform.value.Name);
   fd.append('email',this.regform.value.Email);
   fd.append('img' , this.selectedFile,this.selectedFile.name);
   }

    this.userservice.CreateUser(fd).subscribe(
      data=>{
            //valid
        this.accepted="your account is created succeffully";
      setTimeout(() => {
        this.router.navigateByUrl('user/home');
      }, 3000);
      },err=>{

        this.error=err.error.error;   // not valid
      });
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


