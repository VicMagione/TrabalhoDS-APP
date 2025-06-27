import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastrar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-clientes.component.html',
  styleUrls: ['./cadastrar-clientes.component.css']
})
export class CadastrarClienteComponent {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) {
    this.formulario = this.fb.group({
      id: [0], // campo opcional para identificar edição
      nome: ['', Validators.required],
      email: ['', Validators.required],
      senha:['',Validators.required],
      nivelAcesso:['',Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.clienteService.buscarPorId(id).subscribe(cliente => {
        this.formulario.patchValue(cliente);
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.clienteService.salvar(this.formulario.value).subscribe(() => {
        alert('Cliente cadastrado com sucesso!');
        this.formulario.reset();
        this.router.navigate(['/consultar']);
      });
    }
  }
}
