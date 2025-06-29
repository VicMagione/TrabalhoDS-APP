import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarContasComponent } from './consultar-contas.component';

describe('ConsultarContasComponent', () => {
  let component: ConsultarContasComponent;
  let fixture: ComponentFixture<ConsultarContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarContasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
