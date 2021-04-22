import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GetOneBlogComponent } from './components/get-one-blog/get-one-blog.component';
import { HomeComponent } from './components/home/home.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import {JwtModule } from '@auth0/angular-jwt'
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

  

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GetOneBlogComponent,
    HomeComponent,
    AddBlogComponent,
    ProfileComponent,
    SearchComponent,
    ViewUserComponent,
    NavbarComponent,
    EditUserComponent,
    EditBlogComponent,
    NotFoundComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })    
  ],
  providers: [ 
     AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
