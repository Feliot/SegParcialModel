import { MiCaptchamoduleModule } from './mi-captcha/mi-captchamodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  exports: [MiCaptchamoduleModule],
  imports: [
    CommonModule,
    MiCaptchamoduleModule
  ]
})
export class UtilmoduleModule { }
