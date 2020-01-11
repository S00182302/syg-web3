import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AboutComponent } from './comp/about/about.component';
import { HeaderComponent } from './comp/header/header.component';
import { FooterComponent } from './comp/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivitiesComponent } from './comp/activities/activities.component';
import { BlogComponent } from './comp/blog/blog.component';
import { ActivityCalendarComponent } from './comp/activity-calendar/activity-calendar.component';
import { VolunteersComponent } from './comp/volunteers/volunteers.component';
import { MemberComponent } from './comp/member/member.component';
import { VolunteerComponent } from './comp/volunteer/volunteer.component';
import { HomeComponent } from './comp/home/home.component';
import { JoinComponent } from './comp/join/join.component';
import { AvailabilityComponent } from './comp/availability/availability.component';
import { LoginComponent } from './comp/login/login.component';
import { ProjectsComponent } from './comp/projects/projects.component';
import { DetailsComponent } from './comp/details/details.component';
import { ContactComponent } from './comp/contact/contact.component';
import { CreateBlogComponent } from './comp/create-blog/create-blog.component';
import { ActivityComponent } from './comp/activity/activity.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { CountUpModule } from 'countup.js-angular2';
import { ForgotPasswordComponent } from './comp/forgot-password/forgot-password.component';
import { HttpService } from './comp/Shared/http.service';
import {ReactiveFormsModule} from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    ActivitiesComponent,
    BlogComponent,
    ActivityCalendarComponent,
    VolunteersComponent,
    MemberComponent,
    VolunteerComponent,
    HomeComponent,
    JoinComponent,
    AvailabilityComponent,
    LoginComponent,
    ProjectsComponent,
    DetailsComponent,
    ContactComponent,
    CreateBlogComponent,
    ActivityComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    CountUpModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    AgmCoreModule.forRoot ({
      apiKey: 'AIzaSyBB4edoQPLP5vMNXB5Bjt4Nj1PWjtzCNh0'
    })
    
  ],
  providers: [HttpService,AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {}
