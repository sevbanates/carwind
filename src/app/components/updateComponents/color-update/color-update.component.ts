import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  Form,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/modules/color';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm : FormGroup;
  currentColor : Color;
  constructor(private formBuilder : FormBuilder,
              private colorService : ColorService,
              private activatedRoute : ActivatedRoute,
              private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.createColorUpdateForm()
    this.activatedRoute.params.subscribe(params=>{
      if (params["id"]) {
        this.getCurrentColor(params["id"])
      }
    });
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      id : [, Validators.required],
      name : ["", Validators.required]
    })
  }

  getCurrentColor(id : number){
    this.colorService.getColorById(id).subscribe(response=>{
      this.currentColor = response.data
    })
  }
  update(){
    if(this.colorUpdateForm.valid){

   
    let colorModel = Object.assign({}, this.colorUpdateForm.value)

    this.colorService.update(colorModel).subscribe(response=>{
      this.toastrService.success("Marka Bilgileri Güncellendi.","Başarıyla Güncellendi!")
    },responseError=>{
      if (responseError.error.errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          
        }
      }
    }) 
  }else{
    this.toastrService.error("Formunuz eksik", "Hatalı!") 
  }
  }
}
