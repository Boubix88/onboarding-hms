import { UUIDTypes } from 'uuid';

export class LoanEntity {
  id: UUIDTypes;
  name: string;
  montant_emprunt: number;
  taux_interet: number;
  duree_emprunt: number;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<LoanEntity>) {
    Object.assign(this, partial);
  }
}
