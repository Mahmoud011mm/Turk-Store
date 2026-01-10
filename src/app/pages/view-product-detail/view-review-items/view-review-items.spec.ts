import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReviewItems } from './view-review-items';

describe('ViewReviewItems', () => {
  let component: ViewReviewItems;
  let fixture: ComponentFixture<ViewReviewItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReviewItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReviewItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
