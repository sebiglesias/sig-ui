import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductTypeComponent } from './list-product-type.component';

describe('ListProductTypeComponent', () => {
  let component: ListProductTypeComponent;
  let fixture: ComponentFixture<ListProductTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
