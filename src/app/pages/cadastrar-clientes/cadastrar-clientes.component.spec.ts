import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarClienteComponent } from './cadastrar-clientes.component';

describe('CadastrarClientesComponent', () => {
  let component: CadastrarClienteComponent;
  let fixture: ComponentFixture<CadastrarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
