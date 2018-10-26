import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTruckComponent } from './add-truck.component';

describe('AddTruckComponent', () => {
  let component: AddTruckComponent;
  let fixture: ComponentFixture<AddTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
