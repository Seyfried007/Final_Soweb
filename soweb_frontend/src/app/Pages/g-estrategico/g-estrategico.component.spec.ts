import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GEstrategicoComponent } from './g-estrategico.component';

describe('GEstrategicoComponent', () => {
  let component: GEstrategicoComponent;
  let fixture: ComponentFixture<GEstrategicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GEstrategicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GEstrategicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
