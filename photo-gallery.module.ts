import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { PhotoGallery } from "./components/photo-gallery";
import { PhotoGallerySlides } from "./components/photo-gallery-slides";
import { BrowserModule } from '@angular/platform-browser';
import { ModalService } from "./providers/modal.service";

const COMPONENTS = [
    PhotoGallery,
    PhotoGallerySlides
]

@NgModule({
    entryComponents: COMPONENTS,
    declarations: COMPONENTS,
    imports: [
        IonicModule
    ],
    exports: COMPONENTS,
    providers: [
        ModalService
    ]
})

export class PhotoGalleryModule { }




