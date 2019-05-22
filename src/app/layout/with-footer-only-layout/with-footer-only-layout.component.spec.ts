import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithFooterOnlyLayoutComponent } from './with-footer-only-layout.component';

describe('WithFooterOnlyLayoutComponent', () => {
  let component: WithFooterOnlyLayoutComponent;
  let fixture: ComponentFixture<WithFooterOnlyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithFooterOnlyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithFooterOnlyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
