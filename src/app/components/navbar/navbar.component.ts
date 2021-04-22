import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name:string;
  flag:boolean=true;
  searchflag:boolean=true;
  constructor(private router:Router,private userService:UserService) { 

    this.router.events.subscribe(event => {

      if (event.constructor.name === "NavigationEnd") {
      
        this.name = (<any>event).url.split("/").slice(-1)[0];
        
        if(this.name=='login'||this.name=='register'){
          this.flag=false;
        }
        
        else{
          this.flag=true;
        }
        // if(this.name=='home'){
          
        //   this.searchflag=true;
        // }else{
        //   this.searchflag=false;
        // }
      }
    })
   
  }

  ngOnInit(): void {


    
  }


  logout(){
 
    this.userService.logout();
    this.router.navigateByUrl('/login');

  }



  search(val:string){
   // this.router.navigate(['/search'], { queryParams: { name: val } });
    this.router.navigateByUrl('/search/'+val);

  }

}
