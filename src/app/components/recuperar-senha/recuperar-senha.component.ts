import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ClienteService } from '../../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {
  passoAtual: number = 1;
  formCpf: FormGroup;
  formEmail: FormGroup;
  formSenha: FormGroup;
  clienteValido: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<RecuperarSenhaComponent>,
    private snackBar: MatSnackBar
  ) {
    this.formCpf = this.fb.group({
      cpf: ['', [Validators.required,]]
    });

    this.formEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.formSenha = this.fb.group({
      novaSenha: ['', [Validators.required, Validators.minLength(3)]],
      confirmarSenha: ['', Validators.required]
    }, { validator: this.senhasIguais });
  }

  senhasIguais(group: FormGroup): { [key: string]: any } | null {
    const senha = group.get('novaSenha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  verificarCpf(): void {
    if (this.formCpf.valid) {
      this.passoAtual = 2;
    }
  }

  verificarEmail(): void {
    if (this.formEmail.valid) {
      const cpf = this.formCpf.value.cpf;
      const email = this.formEmail.value.email;

      this.clienteService.verificarClientePorCpfEmail(cpf, email).subscribe({
        next: (res) => {
          this.clienteValido = res.valido;
          this.passoAtual = 3;
        },
        error: () => {
          this.snackBar.open('Combinação de CPF e e-mail não encontrada', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  alterarSenha(): void {
    if (this.formSenha.valid && this.clienteValido) {
      const cpf = this.formCpf.value.cpf;
      const novaSenha = this.formSenha.value.novaSenha;
      const email = this.formEmail.value.email;


      this.clienteService.buscarPorCpf(cpf).subscribe({

        next: (cliente: any) => {
          if (!cliente) {
            throw new Error('Cliente não encontrado');
          }

          if (cliente.email != email) {
              this.snackBar.open('Combinação de CPF e e-mail não encontrada', 'Fechar', { duration: 3000 });
            this.fecharDialogo();
          }
          else {
            const dadosAtualizacao = {
              nome: cliente.nome,
              cpf: cliente.cpf,
              senha: novaSenha, // Nova senha (será codificada no backend)
              email: cliente.email,
              telefone: cliente.telefone
            };

            this.clienteService.atualizarCliente(cpf, dadosAtualizacao).subscribe({
              next: () => {
                this.snackBar.open('Senha alterada com sucesso!', 'Fechar', {
                  duration: 3000,
                  panelClass: ['sucesso-snackbar']
                });
                this.dialogRef.close();
              },
              error: (err) => {
                this.snackBar.open(`Erro ao atualizar: ${err.message}`, 'Fechar', {
                  duration: 3000,
                  panelClass: ['erro-snackbar']
                });
              }
            });
          }
        },

        error: (err) => {
          this.snackBar.open(`Erro ao buscar cliente: ${err.message}`, 'Fechar', {
            duration: 3000,
            panelClass: ['erro-snackbar']
          });
        }
      });
    }
  }
  fecharDialogo(): void {
    this.dialogRef.close();
  }
  voltar(): void {
    this.passoAtual--;
  }
}