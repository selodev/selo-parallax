import { Component, h, Element, Host } from '@stencil/core';

@Component({
  tag: 'app-home-banner',
  styleUrl: 'app-home-banner.css',
  shadow: false,
})
export class AppHomeBanner {
  @Element() el: Element;
  content: Element;
  header: Element;
  headerHeight: any;
  moveImage;
  scaleImage;

  //@Listen('ion-scroll', { capture: true, target: 'window' })
  handleScroll(ev) {
    //console.log('the body was scrolled', ev);
    const scrollTop = ev.detail.scrollTop;
    //console.log('scroll top ', scrollTop);
    if (scrollTop > 0) {
      this.moveImage = scrollTop / 2;
      this.scaleImage = 1;
    } else {
      this.moveImage = scrollTop / 1.4;
      this.scaleImage = -scrollTop / this.headerHeight + 1;
    }
    this.header.setAttribute(
      'style',
      `transform: translate3d(0, ${this.moveImage}px, 0) scale(${this.scaleImage}, ${this.scaleImage})`,
    );
  }

  componentDidLoad() {
    this.content = this.el.closest('ion-content');
    this.content.addEventListener('ionScroll', ev => this.handleScroll(ev));
    this.header = this.el.querySelector('.parallax-image');
    this.headerHeight = this.header.clientHeight;
  }
  render() {
    return (
      <Host>
        <div class="parallax-image"></div>
        <div class="parallax-content">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
