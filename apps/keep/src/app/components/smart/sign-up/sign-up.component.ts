import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit, OnDestroy {
  @Input() logPassEmailForm: FormGroup;

  public signUpFormFull: FormGroup;
  public isLoadedSignUp: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private onDestroy$ = new Subject<boolean>();

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
  ) { }

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

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  public singUpFormFull(): void {
    const userData = {
      ...this.signUpFormFull.value,
      ...{
        password: this.logPassEmailForm.value.password,
        email: this.logPassEmailForm.value.email,
        login: this.logPassEmailForm.value.login,
      }
    };
    this.userService.setUser(userData)
      .pipe(
        tap(() => this.isLoadedSignUp.next(true)),
        delay(3000),
        tap(() => this.isLoadedSignUp.next(false)),
        takeUntil(this.onDestroy$),
      )
      .subscribe();
  }

  public onClickSignUpSubmit(): void {

  }

}
