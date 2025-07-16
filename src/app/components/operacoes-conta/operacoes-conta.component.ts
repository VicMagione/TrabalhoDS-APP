// operacoes-conta.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ContasService } from '../../services/contas.service';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-operacoes-conta',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './operacoes-conta.component.html',
  styleUrls: ['./operacoes-conta.component.css']
})
export class OperacoesContaComponent {
  contas: any[] = [];
  selectedConta: any;
  limiteControl = new FormControl<number | null>(null, [Validators.required, Validators.min(0)]);


  // Formulários
  chavePixControl = new FormControl<String | null>('', [Validators.required]);

  constructor(private contasService: ContasService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.carregarContas();
  }

  carregarContas(): void {
    const dadosToken = this.loginService.extrairDadosToken();
    const clienteCpf = Number(dadosToken.sub);

    this.contasService.listarContasPorCpf(clienteCpf).subscribe(contas => {
          console.log('Contas carregadas:', this.contas); // Adicione este log

      this.contas = contas;
    });
  }


  // In atualizarLimite(), convert the value to number if needed
  atualizarLimite(): void {
    console.log('Selected conta:', this.selectedConta);
  console.log('Limite control valid:', this.limiteControl.valid);
  console.log('Limite value:', this.limiteControl.value);
    if (this.selectedConta && this.limiteControl.valid) {
      const limiteValue = Number(this.limiteControl.value);
      this.contasService.atualizarLimite(this.selectedConta.id, limiteValue)
        .subscribe(() => {
          alert('Limite atualizado com sucesso!');
          this.carregarContas();
        });
    }
  }

  atualizarChavePix(): void {
    if (this.selectedConta && this.chavePixControl.valid) {
      const chavePix = String(this.chavePixControl.value)
      this.contasService.atualizarChavePix(this.selectedConta.id, chavePix)
        .subscribe(() => {
          alert('Chave PIX atualizada com sucesso!');
          this.carregarContas();
        });
    }
  }
}
