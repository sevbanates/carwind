import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Obj } from '@popperjs/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup
  constructor(private authService : AuthService,
              private toastrService : ToastrService,
              private formBuilder : FormBuilder,
              private router : Router) { }


  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName : ["", Validators.required],
      lastName : ["", Validators.required],
      email :["", Validators.required],
      password : ["", Validators.required]
    })
  }

  register(){
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value)

      this.authService.register(registerModel).subscribe(response=>{
        console.log(response)
        this.toastrService.info(response.message)
        this.router.navigate(["login"])
      },responseError=>{
        console.log(responseError.error.message)
        this.toastrService.error(responseError.error.message)
      })
    }else{
      this.toastrService.error("Geçersiz form")
    }
   
  }
}
