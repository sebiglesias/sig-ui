import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillOfLoadingComponent } from './edit-bill-of-loading.component';

describe('EditBillOfLoadingComponent', () => {
  let component: EditBillOfLoadingComponent;
  let fixture: ComponentFixture<EditBillOfLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBillOfLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillOfLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
