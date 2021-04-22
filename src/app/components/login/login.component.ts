import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logform:FormGroup;
  public username: string;
  public password: string;
  img:string="/assets/log2.PNg";

  error:string|null=null;

  constructor(private fb:FormBuilder,private userservice:UserService,private router:Router) { 
  this.logform=this.fb.group({
    UserName:['',[Validators.required,Validators.minLength(3)]],
    Password:['',[Validators.required,Validators.minLength(8),Validators.pattern('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/')]],
  });
}




  ngOnInit(): void {


   
  }






  public onlogin() {

    this.userservice.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => {
          
            this.router.navigate(['home']);
            
            
            
        },
        err => this.error = 'your data incorrect'
      );

      setTimeout(() => {
        this.error=null;
      }, 1000);
  }

}
