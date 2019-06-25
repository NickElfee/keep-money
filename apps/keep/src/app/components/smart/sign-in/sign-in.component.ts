import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.signInForm = this.builder.group({
      userLogin: new FormControl('', [
        Validators.required
      ]),
      userPassword: new FormControl('', [
        Validators.required
      ]),
    });
  }

  public signIn(): void {

  }

  public onClickSignInSubmit(): void {

  }

}
