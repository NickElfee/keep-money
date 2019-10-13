import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { UserDto } from '../../../../../../../libs/data/src';
import { Router } from '@angular/router';
import { RouterUrl } from '../../../configs/router-url.enum';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, OnDestroy {
  public isLoadedUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public signInForm: FormGroup;

  private onDestroy$ = new Subject<boolean>();
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

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

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  public signIn(): void {

  }

  public onClickSignInSubmit(): void {

  }

  public onClickGetUser(): void {
    const userLogin = this.signInForm.value.userLogin;
    const userPassword = this.signInForm.value.userPassword;
    this.authService.singIn$(userLogin, userPassword)
      .pipe(
        tap(() => this.isLoadedUser.next(true)),
        take(1),
        filter((userList: UserDto[]) => !!userList.length),
        map((userList: UserDto[]) => userList[0]._id),
        delay(2000),
        tap(() => this.isLoadedUser.next(false)),
        takeUntil(this.onDestroy$),
      )
        .subscribe(
          (userId: string) => this.router.navigate([`/${RouterUrl.USER}/${userId}`])
        );
  }

}
