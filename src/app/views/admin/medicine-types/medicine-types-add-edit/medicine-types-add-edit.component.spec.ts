import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTypesAddEditComponent } from './medicine-types-add-edit.component';

describe('MedicineTypesAddEditComponent', () => {
  let component: MedicineTypesAddEditComponent;
  let fixture: ComponentFixture<MedicineTypesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineTypesAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTypesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
