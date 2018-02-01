import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NavParams, ViewController, Slides } from "ionic-angular";
import { ModalService } from "../providers/modal.service";

@Component({
    selector: 'photo-gallery-slides',
    templateUrl: 'photo-gallery-slides.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoGallerySlides {
    @Input() imagesSrc: any[];
    @Input() idx: number;
    @Input() loop: boolean = false;
    @Input() modalService: ModalService;
    @ViewChild('slides') slides: Slides;

    currentSlide: number;

    constructor(
        private params: NavParams,
        private viewCtrl: ViewController
    ) { 
        this.imagesSrc = params.get('imagesSrc');
        this.idx = params.get('idx');
        this.modalService = params.get('modalService');
        this.loop = params.get('loop') as boolean;
        this.currentSlide = this.idx + 1;
    }

    closeModal(){
        this.viewCtrl.dismiss();
    }

    slideChange(){
        let activeIndex = this.slides.getActiveIndex();
        if(!this.slides['_isLoop']){
            this.currentSlide = activeIndex + 1 > this.imagesSrc.length ? this.imagesSrc.length : (activeIndex == 0 ? 1 : activeIndex + 1);
        } else{
            this.currentSlide = activeIndex - 1 < 0 ? this.imagesSrc.length : (activeIndex > this.imagesSrc.length ? 1 : activeIndex); 
        }
        this.modalService.slideChange();
    }
}
