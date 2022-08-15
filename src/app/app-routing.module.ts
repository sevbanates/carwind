import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorComponent } from './components/color/color.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandUpdateComponent } from './components/updateComponents/brand-update/brand-update.component';
import { CarUpdateComponent } from './components/updateComponents/car-update/car-update.component';
import { ColorUpdateComponent } from './components/updateComponents/color-update/color-update.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
    {path:"", pathMatch:"full", component : CarComponent},
    {path:"cars", component : CarComponent},
    {path:"colors", component : ColorComponent},
    {path:"cars/brand/:brandId", component : CarComponent},
    {path:"cars/color/:colorName", component : CarComponent},
    {path:"cars/cardetails/:carId", component : CardetailComponent},
    {path:"cars/rental/:carId", component : RentalComponent},
    {path:"cars/add", component : CarAddComponent, canActivate:[LoginGuard]},
    {path:"brands/add", component : BrandAddComponent, canActivate:[LoginGuard]},
    {path:"colors/add", component : ColorAddComponent, canActivate:[LoginGuard]},
    {path:"brands/update/:id", component : BrandUpdateComponent, canActivate:[LoginGuard]},
    {path:"colors/update/:id", component : ColorUpdateComponent, canActivate:[LoginGuard]},
    {path:"cars/update/:id", component : CarUpdateComponent, canActivate:[LoginGuard]},
    {path:"login", component : LoginComponent},
    {path:"register", component : RegisterComponent}










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
