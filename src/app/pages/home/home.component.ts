import { Component } from '@angular/core';

// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { SaldoService } from '../../shared/saldo.service';
import { CommonModule } from '@angular/common'; // Adicione esta linha


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,MatSelectModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  saldoTotal: number = 0;
 constructor(private saldoService: SaldoService) {}

  ngOnInit(): void {
    this.saldoService.saldoTotal$.subscribe(saldo => {
      this.saldoTotal = saldo;
    });
  }
}
