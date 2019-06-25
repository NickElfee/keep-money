import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public soundOn = true;
  public signUpForm: FormGroup;
  public isSignUp = true;
  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.builder.group({
      userName: new FormControl('', [
        Validators.required
      ]),
      userPassword: new FormControl('', [
        Validators.required
      ]),
      userEmail: new FormControl('', [
        Validators.required
      ]),
    });
  }

  public signUp(): void {

  }

  public signIn(): void {

  }

  public submit(): void {

  }

  public onClickSignUpSubmit() {
    this.isSignUp = !this.isSignUp;
  }

  public mute(elem): void {
    (elem.muted) ? elem.muted = false : elem.muted = true;
    this.soundOn = !this.soundOn;
  }

}
