import { Loan } from '../APITypes/LoanType';

export const LOAN: Loan[] = [
  {
    id: 'c5771138-d621-48ab-9ea8-8c254eb92ec0',
    name: 'Maison',
    montant_emprunt: 200000,
    taux_interet: 1.5,
    duree_emprunt: 20,
  },
  {
    id: '045f0767-862c-4da6-ac40-246e7acfcb35',
    name: 'Appartement',
    montant_emprunt: 20000,
    taux_interet: 3,
    duree_emprunt: 5,
  },
  {
    id: 'ce043d4d-8c49-4b01-bcb3-267b868f054e',
    name: 'Travaux',
    montant_emprunt: 10000,
    taux_interet: 2,
    duree_emprunt: 3,
  },
  {
    id: 'cf24d9bd-5225-4524-a553-7aceb83b2835',
    name: 'Vacances',
    montant_emprunt: 5000,
    taux_interet: 5,
    duree_emprunt: 1,
  },
];
