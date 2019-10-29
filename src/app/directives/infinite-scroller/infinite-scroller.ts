// Code taken from https://github.com/ashwin-sureshkumar/angular-infinite-scroller
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

import { fromEvent } from 'rxjs';

export const LIMIT = 100;

interface ScrollPosition {
  sH: number;
  sT: number;
  cH: number;
}

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  sH: 0,
  sT: 0,
  cH: 0
};

/**
 * Generated class for the InfiniteScrollerDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 *
 * This code was taken from https://github.com/ashwin-sureshkumar/angular-infinite-scroller and is used
 * to create the infinitescroller used in the User Interface
 */

@Directive({
  selector: '[appInfiniteScroller]' // Attribute selector
})
export class InfiniteScrollerDirective implements AfterViewInit {
  private scrollEvent$;
  private userScrolledDown$;
  private requestOnScroll$;

  @Input()
  scrollCallback;

  @Input()
  immediateCallback;

  @Input()
  scrollPercent = 70;

  @Input()
  loadMore;

  constructor(private elm: ElementRef) { }

  ngAfterViewInit() {
    this.registerScrollEvent();
    this.streamScrollEvents();
    this.requestCallbackOnScroll();
  }

  private registerScrollEvent() {
    this.scrollEvent$ = fromEvent(this.elm.nativeElement, 'scroll');
  }

  private streamScrollEvents() {
    this.userScrolledDown$ = this.scrollEvent$
      .map((e: any): ScrollPosition => ({
        sH: e.target.scrollHeight,
        sT: e.target.scrollTop,
        cH: e.target.clientHeight
      }))
      .pairwise()
      .filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]));
  }

  private requestCallbackOnScroll() {
    this.requestOnScroll$ = this.userScrolledDown$;

    if (this.loadMore) {
      if (this.immediateCallback) {
        this.requestOnScroll$ = this.requestOnScroll$
          .startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]);
      }

      this.requestOnScroll$
        .exhaustMap(() => {
          return this.scrollCallback();
        })
        .subscribe((data) => { }, (err) => console.log(err));
    }
  }

  private isUserScrollingDown = (positions) => {
    return positions[0].sT < positions[1].sT;
  }

  private isScrollExpectedPercent = (position) => {
    return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
  }

}