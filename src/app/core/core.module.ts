import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './core.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//navigation
import { MainNavComponent } from './nav/nav.component';

@NgModule({
  imports:      [ BrowserModule, NgbModule.forRoot()],
  declarations: [ AppComponent,
                  MainNavComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }