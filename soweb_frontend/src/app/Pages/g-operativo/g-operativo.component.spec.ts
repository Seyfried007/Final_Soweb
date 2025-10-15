import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GOperativoComponent } from './g-operativo.component';

describe('GOperativoComponent', () => {
  let component: GOperativoComponent;
  let fixture: ComponentFixture<GOperativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GOperativoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GOperativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
