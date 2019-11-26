import { HotelsService } from './../hotels.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {

  @Output() onQuery: EventEmitter<string> = new EventEmitter();

  constructor(
    private hotelsService: HotelsService,
    private router: Router
  ) { }

  submitForm(form: NgForm) {
    console.log('form: ', form);

    const { fromDate, toDate, guestQuantity, minPrice, maxPrice } = form.value;

    this.hotelsService.getOffers(fromDate, toDate, guestQuantity, minPrice, maxPrice)
    this.router.navigate(['/results'])
  }

  checkForInvalid(form: NgForm) {
    return form.invalid && form.touched
  }

  checkForValid(form: NgForm) {
    return form.valid && form.touched
  }

}



