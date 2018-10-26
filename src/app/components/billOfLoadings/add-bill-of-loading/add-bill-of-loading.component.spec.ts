import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillOfLoadingComponent } from './add-bill-of-loading.component';

describe('AddBillOfLoadingComponent', () => {
  let component: AddBillOfLoadingComponent;
  let fixture: ComponentFixture<AddBillOfLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBillOfLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillOfLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
