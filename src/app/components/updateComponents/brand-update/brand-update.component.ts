import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/modules/brand';
import { BrandService } from 'src/app/services/brand.service';
@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm : FormGroup;
  currentBrand : Brand;
  constructor(private formBuilder : FormBuilder,
              private brandService : BrandService,
              private toastrService : ToastrService,
              private activatedRoute : ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.activatedRoute.params.subscribe(params=>{
      if (params["id"]) {
        this.getCurrentBrand(params["id"])
      }
    });
   
  }
  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      id : [, Validators.required],
      name : ["", Validators.required]
    })
  }

  getCurrentBrand(id : number){
  
   this.brandService.getBrandById(id).subscribe(response=>{
    this.currentBrand = response.data
   })
  }
  update(){
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value)

      this.brandService.update(brandModel).subscribe(response=>{
        this.toastrService.success("Marka Bilgileri Güncellendi.","Başarıyla Güncellendi!")
      },responseError=>{
        if (responseError.error.errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
            
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik", "Hatalı!")    }
  }
}
