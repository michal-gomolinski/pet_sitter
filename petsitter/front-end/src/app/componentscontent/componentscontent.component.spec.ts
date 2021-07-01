import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentscontentComponent } from './componentscontent.component';

describe('ComponentscontentComponent', () => {
  let component: ComponentscontentComponent;
  let fixture: ComponentFixture<ComponentscontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentscontentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentscontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
