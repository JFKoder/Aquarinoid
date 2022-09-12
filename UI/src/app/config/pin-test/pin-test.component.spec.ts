import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinTestComponent } from './pin-test.component';

describe('PinTestComponent', () => {
  let component: PinTestComponent;
  let fixture: ComponentFixture<PinTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
