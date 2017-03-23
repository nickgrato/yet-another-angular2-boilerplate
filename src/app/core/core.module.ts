import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './core.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';//example ng-model

// Import the InputsModule...
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';



//navigation
import { MainNavComponent } from './nav/nav.component';


@NgModule({
  imports:      [ BrowserModule,
                  FormsModule, 
                  NgbModule.forRoot(),
                  InputsModule,
                  DialogModule,
                  ButtonsModule],
  declarations: [ AppComponent,
                  MainNavComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }