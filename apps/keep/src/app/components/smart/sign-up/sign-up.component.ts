import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {UserDto} from '../../../../../../../libs/data/src';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  @Output() clickSingFormFull = new EventEmitter<UserDto>();
    signUpFull(singUp: UserDto): void {
      singUp = this.signUpFormFull.value;
      this.clickSingFormFull.emit(singUp);
    }

  public signUpFormFull: FormGroup;

  constructor(private builder: FormBuilder) { }


  ngOnInit() {
    this.signUpFormFull = this.builder.group({
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      age: new FormControl('', [
        Validators.required
      ]),
      gender: new FormControl('', [
        Validators.required
      ]),
      country: new FormControl('', [
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.required
      ]),
      currency: new FormControl('', [
        Validators.required
      ]),
      personOfFamily: new FormControl('', [
        Validators.required
      ]),
      earns: new FormControl('', [
        Validators.required
      ]),
      budget: new FormControl('', [
        Validators.required
      ]),
      publishBudget: new FormControl('', [
        Validators.required
      ]),
      food: new FormControl('', [
        Validators.required
      ]),
      rent: new FormControl('', [
        Validators.required
      ]),
      clothes: new FormControl('', [
        Validators.required
      ]),
      houseHoldChemicals: new FormControl('', [
        Validators.required
      ]),
      animals: new FormControl('', [
        Validators.required
      ])
    });
  }

  public onClickSignUpSubmit(): void {

  }

}
