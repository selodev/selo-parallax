import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'app-home-banner',
  styleUrl: 'app-home-banner.css',
  shadow: true,
})
export class AppHomeBanner {
  @Element() el: Element;
  content: Element;
  header: Element;
  headerHeight: any;
  moveImage;
  scaleImage;
  
  handleScroll(ev) {
    console.log('the body was scrolled', ev);
    const scrollTop = ev.detail.scrollTop;
    console.log('scroll top ', scrollTop);
    if (scrollTop > 0) {
      this.moveImage = scrollTop / 2;
      this.scaleImage = 1;
    } else {
      this.moveImage = scrollTop / 1.4;
      this.scaleImage = -scrollTop / this.headerHeight + 1;
    }
    this.header.setAttribute('style', `transform: translate3d(0, ${this.moveImage}px, 0) scale(${this.scaleImage}, ${this.scaleImage})`);
  }
  componentDidLoad() {
    this.content = this.el.shadowRoot.querySelector('ion-content');
    this.header = this.content.querySelector('.parallax-image');
    this.headerHeight = this.header.clientHeight;
    console.log('header height', this.headerHeight);
  }
  render() {
    const items = [];
    const mappy = [].constructor(30);
    for (let item of mappy) {
      items.push(item);
    }
    return [
      <ion-content scrollEvents={true} onIonScroll={ev => this.handleScroll(ev)}>
        <div class="parallax-image"></div>
        <div class="main">
          <ion-list>
            {items.map(i => {
              return <ion-item>Dummy Text {i}</ion-item>;
            })}
          </ion-list>
        </div>
      </ion-content>,
    ];
  }
}
