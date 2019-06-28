import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {BehaviorSubject} from 'rxjs';

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
    private userService: UserService,
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
    this.userService.getUser(userLogin, userPassword).subscribe(value => console.log(value));
    this.isLoadedUser.next(true);
  }

}
