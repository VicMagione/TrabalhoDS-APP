import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SaldoService } from '../../services/saldo.service';

@Component({
  selector: 'app-cadastrar-cliente',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule, MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule],
  templateUrl: './cadastrar-clientes.component.html',
  styleUrls: ['./cadastrar-clientes.component.css']
})



export class CadastrarClienteComponent {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService,
    private loginService: LoginService,
    private saldoService: SaldoService,
    private route: ActivatedRoute,
    private router: Router) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      senha: ['', Validators.required],
      nivelAcesso: ['ADMIN', Validators.required],
      email: ['', [Validators.required]],
      telefone: ['', Validators.required]
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
      this.clienteService.criar(this.formulario.value).subscribe({
        next: (clienteSalvo) => {
          alert('Cliente cadastrado com sucesso!');
          this.loginService.autenticar(
            this.formulario.value.cpf,
            this.formulario.value.senha
          ).subscribe({
            next: (token) => {
              this.loginService.salvarToken(token.accessToken);
              this.saldoService.carregarSaldoInicial();
              this.router.navigate(['/home']).then(() => window.location.reload());
            },
            error: (err) => {
              console.error('Erro ao autenticar após cadastro:', err);
              this.router.navigate(['/login']).then(() => window.location.reload());
            }
          });
        },
        error: (err) => {
          alert('Erro ao cadastrar cliente: ' + (err.error?.message || err.statusText));
        }
      });
    }
  }
}
