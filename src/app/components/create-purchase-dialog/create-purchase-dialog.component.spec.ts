import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchaseDialogComponent } from './create-purchase-dialog.component';

describe('CreatePurchaseDialogComponent', () => {
  let component: CreatePurchaseDialogComponent;
  let fixture: ComponentFixture<CreatePurchaseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePurchaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePurchaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
