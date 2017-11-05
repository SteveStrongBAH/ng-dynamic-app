import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeXComponent } from './shape.component';

describe('ShapeXComponent', () => {
  let component: ShapeXComponent;
  let fixture: ComponentFixture<ShapeXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
