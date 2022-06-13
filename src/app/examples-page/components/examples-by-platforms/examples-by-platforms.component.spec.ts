import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesByPlatformsComponent } from './examples-by-platforms.component';

describe('ExamplesByPlatformsComponent', () => {
  let component: ExamplesByPlatformsComponent;
  let fixture: ComponentFixture<ExamplesByPlatformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamplesByPlatformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesByPlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
