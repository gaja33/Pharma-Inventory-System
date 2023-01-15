import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsAddEditComponent } from './doctors-add-edit.component';

describe('DoctorsAddEditComponent', () => {
  let component: DoctorsAddEditComponent;
  let fixture: ComponentFixture<DoctorsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
