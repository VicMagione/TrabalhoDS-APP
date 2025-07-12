import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Conta } from '../../models/conta';
import { ContasService } from '../../services/contas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transferir',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, MatDialogActions,
    MatInputModule, MatDialogContent,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css']
})
export class PixComponent {
  contaOriginSelecionada: Conta | null = null;
  pixDestino: string = '';
  valortransferencia: number = 0;

  constructor(
    public dialogRef: MatDialogRef<PixComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contas: Conta[] },
    private contaService: ContasService,
    private snackBar: MatSnackBar
  ) { }


  realizarTransferir(): void {
    if (!this.contaOriginSelecionada || this.valortransferencia <= 0) {
      this.snackBar.open('Selecione uma conta e informe um valor válido', 'Fechar', { duration: 3000 });
      return;
    }

    if (this.valortransferencia > (this.contaOriginSelecionada.saldo + this.contaOriginSelecionada.limite)) {
      this.snackBar.open('Saldo insuficiente', 'Fechar', { duration: 3000 });
      return;
    }

    this.contaService.realizarPix(this.contaOriginSelecionada.chavePIX, this.pixDestino, this.valortransferencia).subscribe({
      next: () => {
        this.snackBar.open('Pix realizado com sucesso', 'Fechar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open(`Erro: ${err.message}`, 'Fechar', { duration: 5000 });
      }
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }
}