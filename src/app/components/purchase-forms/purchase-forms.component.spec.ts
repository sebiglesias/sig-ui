import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFormsComponent } from './purchase-forms.component';

describe('PurchaseFormsComponent', () => {
  let component: PurchaseFormsComponent;
  let fixture: ComponentFixture<PurchaseFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
