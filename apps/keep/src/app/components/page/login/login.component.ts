import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  @ViewChild('menuSocial') menuSocialElementRef: ElementRef;

  constructor(
    private builder: FormBuilder,
  ) {}

  public menuSocialAction = false;
  public soundOn = true;
  public signUpForm: FormGroup;
  public isSignUp = true;
  public isSignUpFull = false;
  public isSignIn = false;

  @HostListener('window:scroll', ['$event'])
  onScrollSocialMenu($event) {
    if ($event.path[0].defaultView.innerHeight > 721) {
      console.log($event);
      this.menuSocialAction = true;
    }
  }



  ngOnInit(): void {
    this.signUpForm = this.builder.group({
      userLogin: new FormControl('', [
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
    this.isSignIn = false;
    this.isSignUp = true;
    this.isSignUpFull = false;
  }

  public signIn(): void {
    this.isSignIn = true;
    this.isSignUp = false;
    this.isSignUpFull = false;
  }

  public submit(): void {

  }

  public onClickSignUpSubmit() {
    this.isSignUp = !this.isSignUp;
    this.isSignUpFull = !this.isSignUpFull;
  }

  public mute(elem): void {
    (elem.muted) ? elem.muted = false : elem.muted = true;
    this.soundOn = !this.soundOn;
  }

  private scrollEvent(): any {

  }

}
