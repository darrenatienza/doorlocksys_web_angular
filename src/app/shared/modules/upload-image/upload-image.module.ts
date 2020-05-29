import { UploadImageComponent } from './upload-image.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [UploadImageComponent],
  imports: [
    CommonModule, ImageCropperModule
  ], exports: [UploadImageComponent]
})
export class UploadImageModule { }
