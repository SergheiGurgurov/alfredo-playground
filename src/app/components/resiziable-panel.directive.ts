import { Directive, ElementRef, inject, input, output } from '@angular/core';

@Directive({
  selector: '[resizeablePanels]',
})
export class ResizeablePanelDirective {
  direction = input.required<ResizeDirection>({
    alias: 'resizeablePanels',
  });

  onResize = output();

  nativeElement = inject(ElementRef).nativeElement as HTMLElement;
  ngOnInit() {
    let classes = ['rp-resizeable-panels'];
    switch (this.direction()) {
      case 'horizontal':
        classes.push('rp-horizontal');
        break;
      case 'vertical':
        classes.push('rp-vertical');
        break;
    }
    this.nativeElement.classList.add(...classes);
    for (let child of [...this.nativeElement.children]) {
      const last = child === this.nativeElement.lastElementChild;
      if (last) {
        break;
      }
      const dragger = document.createElement('div');

      this.manageDrag(dragger, child as HTMLElement, this.direction());

      dragger.classList.add('rp-resizer');
      child.insertAdjacentElement('afterend', dragger);
    }
  }

  manageDrag(
    dragger: HTMLElement,
    previous: HTMLElement,
    direction: ResizeDirection
  ) {
    let isDragging = false;

    dragger.addEventListener('mousedown', (e) => {
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;

        if (direction === 'horizontal') {
          const newSize = clientX - left;
          previous.style.width = `${newSize}px`;
        } else {
          const newSize = clientY - top;
          previous.style.height = `${newSize}px`;
        }
      };
      const onMouseUp = () => {
        isDragging = false;
        this.onResize.emit();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      isDragging = true;
      const { left, top, width } = previous.getBoundingClientRect();
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
}

export type ResizeDirection = 'horizontal' | 'vertical';
