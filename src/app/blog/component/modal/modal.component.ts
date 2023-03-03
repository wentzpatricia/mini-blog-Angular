import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  public showModal: boolean = false;

  toggle() {
    this.showModal = !this.showModal;
  }
}
