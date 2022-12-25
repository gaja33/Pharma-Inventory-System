import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTypesComponent } from './medicine-types.component';

describe('MedicineTypesComponent', () => {
  let component: MedicineTypesComponent;
  let fixture: ComponentFixture<MedicineTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
