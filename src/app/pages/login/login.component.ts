import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Token } from '../../models/token';
import { Router } from '@angular/router';

// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatCardModule,MatSelectModule,
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

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
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
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert('Login ou senha inválidos.');
        }
      });
    }
  }
}
