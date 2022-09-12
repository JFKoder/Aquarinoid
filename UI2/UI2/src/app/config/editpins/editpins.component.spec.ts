import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpinsComponent } from './editpins.component';

describe('EditpinsComponent', () => {
  let component: EditpinsComponent;
  let fixture: ComponentFixture<EditpinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
