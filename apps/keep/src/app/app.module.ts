import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { LoginComponent } from './components/page/login/login.component';
import { SignUpComponent } from './components/smart/sign-up/sign-up.component';
import { SignInComponent } from './components/smart/sign-in/sign-in.component';
import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { reducers } from './+state/global.reducers';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    NxModule.forRoot(),
    StoreModule.forRoot(
      reducers,
      {
        metaReducers: !environment.production ? [storeFreeze] : [],
      },
    ),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
