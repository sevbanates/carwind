import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { router } from 'ngx-bootstrap-icons';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { CarComponent } from '../car/car.component';
@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm : FormGroup;
  constructor(private formBuilder : FormBuilder,
              private colorService : ColorService,
              private toastrService : ToastrService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.createColorAddForm()
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      name : ["", Validators.required]
    })
  }
  add(){
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı!")
        window.location.assign("http://localhost:4200/colors/add")
        
      }, responseError=>{
          if (responseError.error.Errors.lenght>0) {
            console.log(responseError.error.Errors.ErrorMessage)
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
