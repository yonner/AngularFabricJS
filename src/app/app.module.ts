import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LocationNodeComponent } from './location-node/location-node.component';
import { PathComponent } from './path/path.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationNodeComponent,
    PathComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
