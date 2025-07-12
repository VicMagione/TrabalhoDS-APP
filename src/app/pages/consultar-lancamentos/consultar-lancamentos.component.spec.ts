import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarLancamentosComponent } from './consultar-lancamentos.component';

describe('ConsultarLancamentosComponent', () => {
  let component: ConsultarLancamentosComponent;
  let fixture: ComponentFixture<ConsultarLancamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarLancamentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarLancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
