import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Token } from '../../models/token';
import { LoginService } from '../../services/login.service';

import { Router } from '@angular/router';

// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { SaldoService } from '../../services/saldo.service';
import { RecuperarSenhaComponent } from '../../components/recuperar-senha/recuperar-senha.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup: FormGroup;
  token: Token;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private saldoService: SaldoService,
    private dialog: MatDialog,
    private router: Router) {
    this.formGroup = this.formBuilder.group({
      cpf: ['', Validators.required],
      senha: ['', Validators.required]
    });

    this.token = new Token();
  }

  ngOnInit(): void {
    this.loginService.limparToken();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;

      this.loginService.autenticar(formValue.cpf, formValue.senha).subscribe({
        next: (resposta) => {
          this.token = resposta;
          this.loginService.salvarToken(this.token.accessToken);
          this.saldoService.carregarSaldoInicial();
          this.router.navigate(['/home']).then(() => window.location.reload());;
        },
        error: (err) => {
          alert('Login ou senha inválidos.');
        }
      });
    }
  }

  redirectToCadastro(): void {
    this.router.navigate(['/cadastrar']);
  }
  abrirRecuperarSenha(): void {
  this.dialog.open(RecuperarSenhaComponent, {
    width: '450px'
  });
}
}
