import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { VisualizationPageComponent } from './visualization-page/visualization-page.component';
import { ExamplesPageComponent } from './examples-page/examples-page.component';
import { ExamplesBySexAndAgeComponent } from './examples-page/components/examples-by-sex-and-age/examples-by-sex-and-age.component';
import { ExamplesByPlatformsComponent } from './examples-page/components/examples-by-platforms/examples-by-platforms.component';
import { InstructionPageComponent } from './instruction-page/instruction-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    VisualizationPageComponent,
    ExamplesPageComponent,
    ExamplesBySexAndAgeComponent,
    ExamplesByPlatformsComponent,
    InstructionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
