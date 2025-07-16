import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAcessosComponent } from './consultar-acessos.component';

describe('ConsultarAcessosComponent', () => {
  let component: ConsultarAcessosComponent;
  let fixture: ComponentFixture<ConsultarAcessosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarAcessosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarAcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
