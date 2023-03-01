import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public totalItem: number = 0;
  public iconMenuResponsive: boolean = false;
  public animationItensMenuResponsive: boolean = false;

  openMenu() {
    this.animationItensMenuResponsive = !this.animationItensMenuResponsive;
    this.iconMenuResponsive = !this.iconMenuResponsive;
  }
}
