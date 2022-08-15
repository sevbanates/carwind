import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/modules/car';
import { CarImage } from 'src/app/modules/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  cars : Car[] = [];
  carImages:CarImage[];
  imgBaseUrl : string ='https://localhost:44384/uploads/images/';
  constructor(private carService : CarService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
      }
    });
  }

  getCarDetailsByCarId(carId : number){
      this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.cars = response.data
      this.carImages = this.cars.find(c=> c.carId == carId).carImagePath;
      })
  }

  getCurrentImageClass(image: CarImage) {
    if (image == this.carImages[0]) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  getButtonClass(image: CarImage) {
    if (image == this.carImages[0]) {
      return 'active';
    } else {
      return '';
    }
  }
}
