import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMinhasContasComponent } from './consultar-minhas-contas.component';

describe('ConsultarMinhasContasComponent', () => {
  let component: ConsultarMinhasContasComponent;
  let fixture: ComponentFixture<ConsultarMinhasContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarMinhasContasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarMinhasContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
