import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/modules/rental';
import { RentalService } from 'src/app/services/rental.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AddForRental } from 'src/app/modules/addForRental';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { CarForDetail } from 'src/app/modules/carForDetails';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  addForRental : AddForRental;
  carForDetail : CarForDetail;
  minStartDate: Date = new Date();
  minEndDate: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();
  diff: number = 0;
  money: number = 0;
  cardNumber: string;
  paymentPage: boolean = false;
  creditCardForm:FormGroup;
  isCardExist:boolean = true;
  checkBox:boolean=false;
  rentalAddFormGroup: FormGroup;
  rentDate:Date;
  returnDate:Date;
  constructor(private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private carService : CarService,
    private modalService : NgbModal,
    private toastrService : ToastrService
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (!params["carId"]) {
        this.router.navigateByUrl('/cardetails');
        return
      }else{
      }
    })
    this.getRental();
  }
  getRental(): void {
    this.rentalService.getRental().subscribe((response) => {
      this.rentals = response.data;
    });
  }
  setMinEndDate() {
    this.minEndDate = this.startDate;
  }

  createRentalAddForm() {
    this.rentalAddFormGroup = this.formBuilder.group({
      carName: ['', [Validators.required]],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', [Validators.required]],
      description: ['', Validators.required],
    });
  }
  checkIfCarExists(id: number) {
    this.carService.getCarDetailsByCarId(id).subscribe(
      (s) => {
        if (!s.success) this.router.navigateByUrl('');
      },
      (e) => {
        this.router.navigateByUrl('');
        this.toastrService.error(e.message, 'HATA');
      }
    );
  }
  rentCar() {
    let newRental: AddForRental = {
      carId: this.carForDetail.id,
      rentDays: this.diff,
      cardNumber: this.cardNumber,
      totalPrice: this.money,
    };
    this.rentalService.addRental(newRental).subscribe(
      (s) => {
        this.toastrService.success(s.message, 'Başarılı');
        this.router.navigateByUrl('/cars/cardetails/' + this.carForDetail.id);
      },
      (e) => {
        this.toastrService.error(e.error.message, 'HATA!');
      }
    );
      this.modalService.dismissAll();
  }
  goToBack() {
    this.paymentPage = false;
  }
  goToPayment() {
    this.paymentPage = true;
    console.log(this.isCardExist)
  }


  saveModal(content:any) {
    this.modalService.open(content);

  }
}
