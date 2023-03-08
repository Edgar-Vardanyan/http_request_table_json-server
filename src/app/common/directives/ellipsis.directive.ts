import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEllipsis]'
})
export class EllipsisDirective {

  constructor(private elementRef: ElementRef) { }
  ngAfterViewInit(): void {
      setTimeout(() => {
          const element = this.elementRef.nativeElement;
          if (element.offsetWidth < element.scrollWidth) {
              element.title = element.innerHTML;
          }
      }, 1000);
  }

}
