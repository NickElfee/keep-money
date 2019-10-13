import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
  ],
  providers: [
    AuthGuard,
    AuthService,
  ],
  exports: [
  ],
})
export class AuthModule { }
