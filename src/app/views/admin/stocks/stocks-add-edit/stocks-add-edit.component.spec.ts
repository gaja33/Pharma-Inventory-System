import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksAddEditComponent } from './stocks-add-edit.component';

describe('StocksAddEditComponent', () => {
  let component: StocksAddEditComponent;
  let fixture: ComponentFixture<StocksAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
