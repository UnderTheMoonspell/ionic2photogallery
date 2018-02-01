import { Component, Input, ChangeDetectionStrategy, ViewChild, Output } from '@angular/core';
import { AnalyticsService } from "../../shared/services/analytics/analytics.service";
import { ModalController, Slide, Slides } from "ionic-angular";
import { Photo } from "../models/photo";
import { PhotoGallerySlides } from "./photo-gallery-slides";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ModalService } from "../providers/modal.service";


@Component({
    selector: 'photo-gallery',
    templateUrl: 'photo-gallery.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ModalService]
})
export class PhotoGallery {
    @ViewChild('slides') slides: Slides;
    @Input() imagesSrc: Photo[];
    @Input() loop: boolean;
    @Input() modalLoop: boolean = false;
    @Output() slideChange$: Subject<void> = new Subject();

    protected ngUnsubscribe: Subject<void> = new Subject<void>();
    constructor(
        private modalCtrl: ModalController,
        private modalService: ModalService
    ) {
        this.modalService.onSlideChange$()
            .takeUntil(this.ngUnsubscribe).skip(1).subscribe(() => {
                this.slideChange$.next(null);
            });
    }

    openImage() {
        if (this.slides.clickedIndex) {
            let idx = parseInt(this.slides._slides[this.slides.clickedIndex].getAttribute('data-swiper-slide-index'));
            let modal = this.modalCtrl.create(PhotoGallerySlides, { imagesSrc: this.imagesSrc, idx, loop: this.modalLoop, modalService: this.modalService });
            modal.present();
        }
    }

    ngAfterViewInit() {
        this.slides.centeredSlides = true;
        this.slides.autoHeight = true;
    }

    slideChange() {
        this.slideChange$.next(null);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
