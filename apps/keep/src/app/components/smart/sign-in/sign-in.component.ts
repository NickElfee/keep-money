import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {BehaviorSubject} from 'rxjs';
import {delay, filter, map, take, tap} from 'rxjs/operators';
import {UserDto} from '../../../../../../../libs/data/src';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterUrl} from '../../../configs/router-url.enum';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  public isLoadedUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public signInForm: FormGroup;
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

  public signIn(): void {

  }

  public onClickSignInSubmit(): void {

  }

  public onClickGetUser(): void {
    const userLogin = this.signInForm.value.userLogin;
    const userPassword = this.signInForm.value.userPassword;
    this.authService.singIn$(userLogin, userPassword)
      .pipe(

      )
        .subscribe(
          (userDto: UserDto[]) => {
            this.router.navigate([`/${RouterUrl.USER}/${userDto[0]._id}`], {relativeTo: this.activatedRoute});
          });


  }

}
