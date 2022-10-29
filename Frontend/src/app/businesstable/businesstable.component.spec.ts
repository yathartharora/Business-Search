import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesstableComponent } from './businesstable.component';

describe('BusinesstableComponent', () => {
  let component: BusinesstableComponent;
  let fixture: ComponentFixture<BusinesstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesstableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
