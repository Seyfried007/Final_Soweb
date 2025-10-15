import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GTacticoComponent } from './g-tactico.component';

describe('GTacticoComponent', () => {
  let component: GTacticoComponent;
  let fixture: ComponentFixture<GTacticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GTacticoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GTacticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
