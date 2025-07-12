import { Conta } from "./conta";

export class Lancamentos {
    id?: number;
    valor!: number;
    idConta!: Conta;
    tipo!: string;     
    operacao!: string; 
}
