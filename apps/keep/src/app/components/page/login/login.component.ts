import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserDto } from '../../../../../../../libs/data/src';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('menuSocial') menuSocialElementRef: ElementRef;

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
  ) {}

  public menuSocialAction = false;
  public soundOn = true;
  public signUpForm: FormGroup;
  public isSignUp = true;
  public isSignUpFull = false;
  public isSignIn = false;

  private onDestroy$ = new Subject<boolean>();

  @HostListener('window:scroll', ['$event'])
  onScrollSocialMenu($event) {
    if ($event.path[0].defaultView.innerHeight > 721) {
      this.menuSocialAction = true;
    }
  }



  ngOnInit(): void {
    this.signUpForm = this.builder.group({
      login: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
    });

    this.userService.getUserList().subscribe(value => console.log(value));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
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

  public onClickSingFormFull(userForm: UserDto): void {
    const userData = {...this.signUpForm.value, ...userForm};
    this.userService.setUser(userData)
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe();
  }

}
