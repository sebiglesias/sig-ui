import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseProgressBarComponent } from './purchase-progress-bar.component';

describe('PurchaseProgressBarComponent', () => {
  let component: PurchaseProgressBarComponent;
  let fixture: ComponentFixture<PurchaseProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
