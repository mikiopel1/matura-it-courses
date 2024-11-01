import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSuccessComponent } from './purchase-success.component';

describe('PurchaseSuccessComponent', () => {
  let component: PurchaseSuccessComponent;
  let fixture: ComponentFixture<PurchaseSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
