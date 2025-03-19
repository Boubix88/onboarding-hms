import { Loan, LoanInCreation, LoanInModification } from "../APITypes/LoanType.tsx";
import {UUIDTypes, v4 as uuidv4} from 'uuid';

/**
 * Cette classe contient les méthodes pour gérer les prêts.
 */
export default class LoanAPI {

    // Tableau dynamique contenant des prêts pour les tests
    static loanData: Loan[] = [{
        id: "c5771138-d621-48ab-9ea8-8c254eb92ec0",
        name: "Maison",
        montant_emprunt: 200000,
        taux_interet: 1.5,
        duree_emprunt: 20,
    },
    {
        id: "045f0767-862c-4da6-ac40-246e7acfcb35",
        name: "Appartement",
        montant_emprunt: 20000,
        taux_interet: 3,
        duree_emprunt: 5,
    },
    {
        id: "ce043d4d-8c49-4b01-bcb3-267b868f054e",
        name: "Travaux",
        montant_emprunt: 10000,
        taux_interet: 2,
        duree_emprunt: 3,
    },
    {
        id: "cf24d9bd-5225-4524-a553-7aceb83b2835",
        name: "Vacances",
        montant_emprunt: 5000,
        taux_interet: 5,
        duree_emprunt: 1,
    }];

    /**
     * Cette méthode récupère tous les prêts.
     */
    static getAllLoan():Loan[] {
        return this.loanData;
    }

    /**
     * Cette méthode modifie un prêt par son id.
     */
    static modifyMontantLoanById(loanModifie: LoanInModification): string {
        this.loanData.map((loan) => {
            if (loan.id === loanModifie.id) {
                loan.montant_emprunt = loanModifie.montant_emprunt;
            }
            return loan;
        });

        return "Prêt modifié avec succès";
    }

    /**
     *  Cette méthode supprime un prêt par son id.
     */
    static deleteLoanById(id: UUIDTypes): string {
        this.loanData = this.loanData.filter((loan) => loan.id !== id);
        return "Prêt supprimé avec succès";
    }

    /**
     * Cette méthode ajoute un prêt.
     */
    static addLoan(loan: LoanInCreation): string {
        const newLoan: Loan = {
            ...loan,
            id: uuidv4()
        };
        this.loanData.push(newLoan);
        return "Prêt crée avec succès";
    }
}