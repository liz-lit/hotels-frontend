import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HotelsService } from '../hotels.service';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  
  @Output() onQuery: EventEmitter<string> = new EventEmitter();

  submitForm(form: NgForm) {
    
    const { fromDate, toDate, personCount, minPrice, maxPrice } = form.value;

    this.onQuery.emit(form.value)
  }

  checkForInvalid(form: NgForm) {
    return form.invalid && form.touched
  }

  checkForValid(form: NgForm) {
    return form.valid && form.touched
  }

}



