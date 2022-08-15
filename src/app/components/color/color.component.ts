import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/modules/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[];
  constructor(private colorService : ColorService) { }
  currentColor ?:Color;
  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

  setCurrentColor(color : Color){
    this.currentColor = color;
  }
  setCurrentDeletedColor(){
    this.currentColor = undefined;
  }
  getAllColorClass(){
    if (!this.currentColor) {
      return "list-group-item text-light bg-info "
    }else{
      return "list-group-item text-light bg-dark "
    }
  }
  getCurrentColorClass(color : Color){
      if (color == this.currentColor) {
        return "list-group-item text-light bg-info "
      }else{
        return "list-group-item text-light bg-dark "
      }
  }

}
