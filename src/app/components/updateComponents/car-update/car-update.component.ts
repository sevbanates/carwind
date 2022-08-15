import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/modules/car';
import { RealCar } from 'src/app/modules/realCar';
import { CarService } from 'src/app/services/car.service';
@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm : FormGroup;
  currentCar : RealCar
  constructor(private formBuilder : FormBuilder,
              private activatedRoute : ActivatedRoute,
              private carService : CarService,
              private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.createCarUpdateForm()
    this.activatedRoute.params.subscribe(params=>{
      if (params["id"]) {
        this.getCurrentCar(params["id"])
      }
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      id : [,Validators.required],
      description: ["", Validators.required],
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
    })
  }

  getCurrentCar(id : number){
    this.carService.getCarById(id).subscribe(response=>{
      this.currentCar = response.data
    })
  }
  update(){
    let carModel = Object.assign({}, this.carUpdateForm.value)

    this.carService.update(carModel).subscribe(response=>{
      this.toastrService.success("Marka Bilgileri Güncellendi.","Başarıyla Güncellendi!")
    },responseError=>{
      if (responseError.error.errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          
        }
      }
    })
  }
}
