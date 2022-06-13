import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesByPlatformsComponent } from './examples-page/components/examples-by-platforms/examples-by-platforms.component';
import { ExamplesBySexAndAgeComponent } from './examples-page/components/examples-by-sex-and-age/examples-by-sex-and-age.component';
import { ExamplesPageComponent } from './examples-page/examples-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InstructionPageComponent } from './instruction-page/instruction-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { VisualizationPageComponent } from './visualization-page/visualization-page.component';

/*const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent}
    ]
  }
];*/

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'visualization', component: VisualizationPageComponent },
  { path: 'instruction', component: InstructionPageComponent },
  { path: 'examples', component: ExamplesPageComponent, children: [
    { path: 'examples-by-sex-and-age', component: ExamplesBySexAndAgeComponent },
    { path: 'examples-by-platforms', component: ExamplesByPlatformsComponent}
    ]
  },
  /*{ path: 'service/:id', component: ServiceComponent },
  {
    path: 'profile', component: ProfileComponent, children: [
      { path: 'my-account', component: MyAccountComponent },
      { path: 'chat', component: ChatComponent }
    ]
  },
  { path: 'my-profile', component: MyProfileComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'chat', component: ChatComponent },
      { path: 'admin-doctors', component: AdminDoctorsComponent },
      { path: 'admin-users', component: AdminUsersComponent },
      { path: 'admin-pets', component: AdminPetsComponent },
      { path: 'admin-schedule', component: AdminScheduleComponent}
    ]
  },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'contact', component: ContactComponent},*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
