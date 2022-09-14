import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef:ElementRef , private renderer: Renderer2) { }
  isOpen = false;
  @HostListener('click' , ['$event']) toggleOpen(event: Event) {
    this.onClick()
  }

  onClick() {
    if (this.isOpen) {
      this.renderer.removeClass(this.elRef.nativeElement.querySelector('.dropdown-menu'), 'd-block');
    } else {
      // this.renderer.addClass(this.elRef.nativeElement.querySelector('.dropdown-menu'), 'd-block');
      // this.renderer.addClass(this.elRef.nativeElement.querySelector('.dropdown-menu'), 'mt-5');
      this.elRef.nativeElement.querySelector('.dropdown-menu').classList.add('d-block', 'mt-5');
    }
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elRef.nativeElement.contains(event.target) || event.target === null) {
      this.isOpen = true;
      this.onClick();
    }
  }
}
