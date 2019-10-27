/**
 * infinite-scroller.spec.ts
 *
 * Created by jake
 * Created on 11/16/18
 *
 * Test the infinite scoller directive.
 * This test uses subscript operators on the class under test to get access to private members.
 */
import { InfiniteScrollerDirective } from './infinite-scroller';
import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

describe('InfiniteScrollerDirective', () => {
  let directive: InfiniteScrollerDirective;
  const mockElementRef = new ElementRef([{}, {}]);

  beforeEach(() => {
    directive = new InfiniteScrollerDirective(mockElementRef);
  });

  test('ngAfterViewInit should call other methods of the class', () => {
    directive.registerScrollEvent = jest.fn();
    directive.streamScrollEvents = jest.fn();
    directive.requestCallbackOnScroll = jest.fn();
    directive.ngAfterViewInit();
    expect(directive.registerScrollEvent).toHaveBeenCalledTimes(1);
    expect(directive.streamScrollEvents).toHaveBeenCalledTimes(1);
    expect(directive.requestCallbackOnScroll).toHaveBeenCalledTimes(1);
  });

  test('registerScrollEvent should set scrollEvent$', () => {
    expect(directive.scrollEvent$).toBeUndefined();
    directive.registerScrollEvent();
    expect(directive.scrollEvent$).toBeDefined();
  });

  test('streamScrollEvents should set userScrolledDown$', () => {
    expect(directive.userScrolledDown$).toBeUndefined();

    // TODO Use marble testing to test Observables. An example of the syntax.
    // directive['scrollEvent$'] = cold('x|', { x: {target: {scrollHeight: 100, scrollTop: 200, clientHeight: 300}}});

    directive.scrollEvent$ = Observable.of(
      { target: {scrollHeight: 100, scrollTop: 200, clientHeight: 300} },
      { target: {scrollHeight: 100, scrollTop: 300, clientHeight: 300} }
    );

    directive.streamScrollEvents();
    // Expect attribute to be defined until marble testing is implemented
    expect(directive.userScrolledDown$).toBeDefined();
    // This method doesn't subscribe so force subscription so observable callbacks run.
    directive.userScrolledDown$.subscribe();
  });

  test('requestCallbackOnScroll should subscribe to the observable and call the callback', () => {
    directive.scrollCallback = jest.fn();
    directive.loadMore = true;
    directive.immediateCallback = true;
    directive.userScrolledDown$ = Observable.of(
      { target: {scrollHeight: 100, scrollTop: 200, clientHeight: 300} },
      { target: {scrollHeight: 100, scrollTop: 300, clientHeight: 300} }
    );
    directive.requestCallbackOnScroll();
    expect(directive.scrollCallback).toHaveBeenCalledTimes(1);
  });

  test('requestCallbackOnScroll should not subscribe to the observable and not call the callback', () => {
    directive.scrollCallback = jest.fn();
    directive.loadMore = false;
    directive.immediateCallback = false;
    directive.userScrolledDown$ = Observable.of(
      { target: {scrollHeight: 100, scrollTop: 200, clientHeight: 300} },
      { target: {scrollHeight: 100, scrollTop: 300, clientHeight: 300} }
    );
    directive.requestCallbackOnScroll();
    expect(directive.scrollCallback).not.toHaveBeenCalled();
  });

  it('cover the else branch ofrequestCallbackOnScroll when loadMore is true and immediateCallback is false', () => {
    directive.scrollCallback = jest.fn();
    directive.loadMore = true;
    directive.immediateCallback = false;
    directive.userScrolledDown$ = Observable.of(
      { target: {scrollHeight: 100, scrollTop: 200, clientHeight: 300} },
      { target: {scrollHeight: 100, scrollTop: 300, clientHeight: 300} }
    );
    directive.requestCallbackOnScroll();
    expect(directive.scrollCallback).toHaveBeenCalledTimes(1);
  });
});
