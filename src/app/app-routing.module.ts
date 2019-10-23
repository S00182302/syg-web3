import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './comp/home/home.component';
import { ActivitiesComponent } from './comp/activities/activities.component';
import { BlogComponent } from './comp/blog/blog.component';
import { VolunteersComponent } from './comp/volunteers/volunteers.component';
import { AboutComponent } from './comp/about/about.component';
import { ContactComponent } from './comp/contact/contact.component';
import { LoginComponent } from './comp/login/login.component';
import { JoinComponent } from './comp/join/join.component';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'activities', component: ActivitiesComponent },
  {path: 'blog', component: BlogComponent },
  {path: 'volunteers', component: VolunteersComponent },
  {path: 'about', component: AboutComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'login', component: LoginComponent },
  {path: 'join', component: JoinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
