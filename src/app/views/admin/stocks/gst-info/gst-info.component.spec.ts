import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstInfoComponent } from './gst-info.component';

describe('GstInfoComponent', () => {
  let component: GstInfoComponent;
  let fixture: ComponentFixture<GstInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GstInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
