import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { router } from 'ngx-bootstrap-icons';
import { Brand } from 'src/app/modules/brand';
import { Color } from 'src/app/modules/color';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands : Brand[] =[];
  dataLoaded =false;
  currentBrand ?: Brand;
  brandFilterText="";

  constructor(private brandService : BrandService,
              private router : Router) {
   
   }

  ngOnInit(): void {
 
    this.getCar();
  }

  getCar():void{
    this.brandService.getBrand().subscribe(response=>{
      this.brands= response.data
    })
  }

  setCurrentBrand(brand : Brand){   
    this.currentBrand = brand;  
  }
  setDeletedCurrentBrand(){
    this.currentBrand = undefined;
  }
  getAllBrandClass(){
    if (!this.currentBrand) {
      return "list-group-item text-light bg-info "
    }else{
      return "list-group-item text-light bg-dark"
    }
  }
  getCurrentBrandClass(brand : Brand){
    if(brand==this.currentBrand){
      return "list-group-item text-light bg-info "
    }else{
      return "list-group-item text-light bg-dark"
    }
  }


}
