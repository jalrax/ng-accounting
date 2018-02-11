import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[sertDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  constructor() {
  }

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}
