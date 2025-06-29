import { Cliente } from "./cliente";

export class Conta {
    id?: number;
    numero!: string;
    saldo!: number;
    limite!: number;
    chavePIX!: string;
    cliente!: Cliente;
}
