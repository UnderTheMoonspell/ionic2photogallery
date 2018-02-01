import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";


@Injectable()
export class ModalService {
    private onSlideChangeSubject$: Subject<void> = new Subject<void>();
    constructor(
    ) { }

    public onSlideChange$(): Observable<void> {
        return this.onSlideChangeSubject$.asObservable();
    }

    public slideChange(): void {
        this.onSlideChangeSubject$.next();
    }    
}
