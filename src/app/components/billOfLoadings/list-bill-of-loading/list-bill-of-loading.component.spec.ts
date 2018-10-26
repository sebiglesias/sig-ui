import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBillOfLoadingComponent } from './list-bill-of-loading.component';

describe('ListBillOfLoadingComponent', () => {
  let component: ListBillOfLoadingComponent;
  let fixture: ComponentFixture<ListBillOfLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBillOfLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBillOfLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
