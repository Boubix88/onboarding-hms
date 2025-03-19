import { UUIDTypes } from "uuid";

export type Loan = {
    id: string;
    name: string;
    montant_emprunt: number;
    taux_interet: number;
    duree_emprunt: number;
}

export type LoanInCreation = {
    id: UUIDTypes;
    name: string;
    montant_emprunt: number;
    taux_interet: number;
    duree_emprunt: number;
}

export type LoanInModification = {
    id: string;
    montant_emprunt: number;
}