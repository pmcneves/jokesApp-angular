import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() closeButtonClicked = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.closeButtonClicked.emit(false)
  }

}
