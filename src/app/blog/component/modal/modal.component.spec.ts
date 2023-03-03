import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('FormModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) #toggle() should toggle #showModal', () => {
    expect(component.showModal).withContext('close at first').toBe(false);

    component.toggle();
    expect(component.showModal).withContext('open after click').toBe(true);

    component.toggle();
    expect(component.showModal)
      .withContext('close after second click')
      .toBe(false);
  });
});
