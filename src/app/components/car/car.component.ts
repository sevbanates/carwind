import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/modules/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars : Car[] =[];
  dataLoaded = false;
  imgBaseUrl : string ='https://localhost:44384/uploads/images/';
  currentCar : Car;
  constructor(private carService : CarService, 
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      else if (params["colorName"]) {
        this.getCarsByColor(params["colorName"])

      } 
      else{
        this.getCars();
      }
        
      
      
    })
    this.getCars();
  }
  getCars():void{
    this.carService.getCars().subscribe(response=> {
      this.cars=response.data
      this.dataLoaded=true
    })
  }

  getCarsByBrand(brandId : string){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true
    })
  }

  getCarsByColor(colorName : string){
    this.carService.getCarsByColor(colorName).subscribe(response =>{
      this.cars = response.data
      this.dataLoaded=true
    })
  }
  getCurrentCarClass(car : Car) {
   this.currentCar = car;
  }
  setCurrentCarImageSrc() {
    return this.imgBaseUrl + this.currentCar.carImagePath[0];
   
  }
  setCurrentCarImageAlt() {
    return this.currentCar.brandName;
  }
}
