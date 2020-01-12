import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./comp/home/home.component";
import { ActivitiesComponent } from "./comp/activities/activities.component";
import { BlogComponent } from "./comp/blog/blog.component";
import { VolunteersComponent } from "./comp/volunteers/volunteers.component";
import { AboutComponent } from "./comp/about/about.component";
import { ContactComponent } from "./comp/contact/contact.component";
import { LoginComponent } from "./comp/login/login.component";
import { JoinComponent } from "./comp/join/join.component";
import { ProjectsComponent } from "./comp/projects/projects.component";
import { ActivityCalendarComponent } from "./comp/activity-calendar/activity-calendar.component";
import { AuthGuard } from "./auth-gaurd.guard";
import { ForgotPasswordComponent } from "./comp/forgot-password/forgot-password.component";
import { CreateBlogComponent } from "./comp/create-blog/create-blog.component";
import { CreateActivityComponent } from "./comp/create-activity/create-activity.component"

const routes: Routes = [ 
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "activities",
    component: ActivitiesComponent
  },
  { path: "blog", component: BlogComponent },
  {
    path: "volunteers",
    component: VolunteersComponent
  },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "join", component: JoinComponent },
  { path: "createblog", component: CreateBlogComponent },
  { path: "createactivity", component: CreateActivityComponent },
  {
    path: "projectCalendar",
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "activityCalendar",
    component: ActivityCalendarComponent,
    canActivate: [AuthGuard]
  },
  { path: "forgotpassword", component: ForgotPasswordComponent }
  //TODO
  /*{ path: '**',  component: PageNotFoundComponent } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
