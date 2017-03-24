import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './core.component.html'
})
export class AppComponent { 
    name = 'Angular'; 
    title = '';
    testClass = 'test-text';
  
    public sliderValue: number = 5;
    public numericValue: number = 5;
    public min: number = 0;
    public max: number = 10;
    public smallStep: number = 1;

   

    onButtonClick() {
        this.title = 'Hello from Kendo UI!';
    }
    public status = "open";
    public opened: boolean = true;
    public onClose() { this.opened = false;
      console.log('closing'); }
    public onAccept() { this.status = "accepted"; }
    public onDecline() { this.status = "declined"; }
    
}

