import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserDto } from '../../../../../../../libs/data/src';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent implements OnInit {
  @Input() userList: UserDto[];
  public userForm: FormGroup;
  constructor(
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      age: new FormControl(this.userList[0].age,),
      animals: new FormControl(this.userList[0].animals,),
      budget: new FormControl(this.userList[0].budget,),
      city: new FormControl(this.userList[0].city,),
      clothes: new FormControl(this.userList[0].clothes,),
      country: new FormControl(this.userList[0].country,),
      currency: new FormControl(this.userList[0].currency,),
      earns: new FormControl(this.userList[0].earns,),
      eat: new FormControl(this.userList[0].eat,),
      houseHoldChemicals: new FormControl(this.userList[0].houseHoldChemicals,),
      noEat: new FormControl(this.userList[0].noEat,),
      personOfFamily: new FormControl(this.userList[0].personOfFamily,),
      publishBudget: new FormControl(this.userList[0].publishBudget,),
    });
    console.log(this.userList);
  }

}
