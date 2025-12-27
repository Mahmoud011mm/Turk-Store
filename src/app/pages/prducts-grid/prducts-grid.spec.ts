import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrductsGrid } from './prducts-grid';

describe('PrductsGrid', () => {
  let component: PrductsGrid;
  let fixture: ComponentFixture<PrductsGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrductsGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrductsGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
