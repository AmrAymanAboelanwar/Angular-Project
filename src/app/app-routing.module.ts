import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { GetOneBlogComponent } from './components/get-one-blog/get-one-blog.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"blog/get/:id",component:GetOneBlogComponent,canActivate:[AuthGuard]},
  {path:"blog/add",component:AddBlogComponent,canActivate:[AuthGuard]},
  {path:"blog/edit/:id",component:EditBlogComponent,canActivate:[AuthGuard]},
  {path:"user/profile",component:ProfileComponent,canActivate:[AuthGuard]},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"user/profile/edit",component:EditUserComponent,canActivate:[AuthGuard]},
  {path:"view-user/:id",component:ViewUserComponent,canActivate:[AuthGuard]},
  {path:"search/:name",component:SearchComponent},
  {path:"user/register",component:RegisterComponent},
  {path:"user/login",component:LoginComponent},
  {path:"user/following",component:HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:"**",component:NotFoundComponent,canActivate:[AuthGuard]},
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
