import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserDto } from '../../../../../../../libs/data/src';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  @ViewChild('menuSocial') menuSocialElementRef: ElementRef;

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
  ) { }

  public menuSocialAction = false;
  public soundOn = true;
  public signUpForm: FormGroup;
  public isSignUp = true;
  public isSignUpFull = false;
  public isSignIn = false;
  public isLoadedIdentify: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  public onClickSignUpSubmit(userData: UserDto) {
    const userEmail = userData.email;
    const userLogin = userData.login;
    this.isSignUp = !this.isSignUp;
    this.isSignUpFull = !this.isSignUpFull;
    this.userService.identifyUser(userEmail, userLogin).subscribe(value => {
      console.log(value);
      if (!value.length) {
        console.log('new User');
      } else {
        console.log('old User');
      }
    });
  }

  public mute(elem): void {
    (elem.muted) ? elem.muted = false : elem.muted = true;
    this.soundOn = !this.soundOn;
  }

}
