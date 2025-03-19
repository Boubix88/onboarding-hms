import { Loan, LoanInCreation, LoanInModification } from "@types/loan";
import {UUIDTypes, v4 as uuidv4} from 'uuid';
import axios from 'axios';

/**
 * Cette classe contient les méthodes pour gérer les prêts.
 */
export default class LoanAPI {
    static LOAN_PATH = 'http://localhost:3000/loan';

    /**
     * Cette méthode récupère tous les prêts.
     * 
     * @returns un tableau de prêts
     * @throws une erreur si la récupération des prêts échoue
     */
   static async getAllLoans(): Promise<Loan[]> {
    try {
        const response = await axios.get<Loan[]>(`${this.LOAN_PATH}`);
        return response.data;
      } catch (error) {
        throw new Error('Impossible de récupérer les prêts');
      }
    }

    /**
     * Cette méthode modifie un prêt par son id.
     * 
     * @param id
     * @param loanModifie
     * @returns un message de succès ou d'erreur
     */
   static async moddifyMontantLoanById(id: UUIDTypes, loanModifie: LoanInModification): Promise<string> {
    try {
        const response = await axios.put(`${this.LOAN_PATH}/${id}`, loanModifie);
        return response.data;
      } catch (error) {
        throw new Error('Impossible de modifier le prêt');
      }
    }

    /**
     *  Cette méthode supprime un prêt par son id.
     * 
     * @param id
     * @returns un message de succès ou d'erreur
     */
    static async deleteLoanById(id: UUIDTypes): Promise<string> {
        try {
            const response = await axios.delete(`${this.LOAN_PATH}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Impossible de supprimer le prêt');
        }
    }

    /**
     * Cette méthode ajoute un prêt.
     * 
     * @param loan
     * @returns un message de succès ou d'erreur
     */
   static async addLoan(loan: LoanInCreation): Promise<string> {
    try {
        const newLoan = {
            ...loan,
            id: uuidv4()
        };
        const response = await axios.post(this.LOAN_PATH, newLoan);
        return response.data;
      } catch (error) {
        throw new Error('Impossible de créer le prêt');
      }
    }
}