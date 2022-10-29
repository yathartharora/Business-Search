import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablegenerateComponent } from './tablegenerate.component';

describe('TablegenerateComponent', () => {
  let component: TablegenerateComponent;
  let fixture: ComponentFixture<TablegenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablegenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablegenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
