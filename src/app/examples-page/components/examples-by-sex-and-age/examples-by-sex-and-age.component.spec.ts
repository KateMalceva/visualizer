import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesBySexAndAgeComponent } from './examples-by-sex-and-age.component';

describe('ExamplesBySexAndAgeComponent', () => {
  let component: ExamplesBySexAndAgeComponent;
  let fixture: ComponentFixture<ExamplesBySexAndAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamplesBySexAndAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesBySexAndAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
