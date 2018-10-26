import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTruckComponent } from './edit-truck.component';

describe('EditTruckComponent', () => {
  let component: EditTruckComponent;
  let fixture: ComponentFixture<EditTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
