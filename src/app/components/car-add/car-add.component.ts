import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm()
  }
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      description: ["", Validators.required],
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
    });
  }
  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value)
      this.carService.add(carModel).subscribe((response) => {
        console.log(response.message)
        this.toastrService.success(response.message, 'Başarılı!')
      },responseError=>{
        if (responseError.error.Errors.length>0) {
          console.log(responseError.error.Errors.ErrorMessage)
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")            
          }
        }
      })
      console.log(carModel)

    } else {

      this.toastrService.error('Formunuz eksik', 'Hatalı!');
    }
  }
}
