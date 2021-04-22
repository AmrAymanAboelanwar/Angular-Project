import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users:User[];

  constructor(private route:ActivatedRoute,private userService:UserService,private router:Router) {

    this.route.params.subscribe(r=>{
      this.userService.search(r.name).subscribe(r=>{
        this.users=r.data;
        console.log(this.users);
      })
    })


   }

  ngOnInit(): void {
  }


 

}
