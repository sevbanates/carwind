import { Component } from '@angular/core';
import { Byte } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carwind';
  user: string = "Sevban Ateş"
}
