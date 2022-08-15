import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup
  constructor(private authService : AuthService,
              private toastrService : ToastrService,
              private formBuilder : FormBuilder,
              private router : Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email :["", Validators.required],
      password : ["", Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)

      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        console.log(response)
        localStorage.setItem("token", response.data.token)
        this.toastrService.info(response.message)
        this.router.navigate([""])
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }
}
