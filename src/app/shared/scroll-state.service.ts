import { Injectable, signal } from '@angular/core';

//import { Service, signal } from '@angular/core';

//@Service()
@Injectable({ providedIn: 'root' })
export class ScrollStateService {
    trendingScrollState = signal<number>(0);

    //toma el valor de scrolltop y lo guarda en el signal
    public stateScrollPage(scrollTOp: number) {
        this.trendingScrollState.set(scrollTOp);
    }


}
