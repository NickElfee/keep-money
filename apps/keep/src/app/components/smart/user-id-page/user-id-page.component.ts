import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UserDto } from '../../../../../../../libs/data/src';
import { Router } from '@angular/router';
import { RouterUrl } from '../../../configs/router-url.enum';
import { Observable } from 'rxjs';
import { AuthDataService } from '../../../auth/services/auth-data.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-id-page',
  templateUrl: './user-id-page.component.html',
  styleUrls: ['./user-id-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIdPageComponent implements OnInit {
  public userList: Observable<UserDto[]>;
  constructor(
    private authService: AuthService,
    private route: Router,
    private authDataService: AuthDataService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userList = this.getCurrentUserById();
  }

  public logout() {
    this.authService.logout();
    this.route.navigate([`/${RouterUrl.LOGIN}`]);
  }

  private getCurrentUserById(): Observable<UserDto[]> {
    return this.userService.getCurrentUserById();
  }
}
