import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import {ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from "ngx-bootstrap";
import {LoginComponent} from "./components/page/login/login.component";
import {SignUpComponent} from "./components/smart/sign-up/sign-up.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
