import { Injectable } from '@nestjs/common';
import { LOAN } from '../data/loan';
import { find, from, of, Observable, map } from 'rxjs';
import { LoanEntity } from './entities/loan.entity';
import { UUIDTypes } from 'uuid';
import { Loan, LoanInModification, LoanInCreation } from '../APITypes/LoanType';

@Injectable()
export class LoanService {
  private _loans: Loan[];

  /**
   * Class constructor
   */
  constructor() {
    this._loans = LOAN;
  }

  /**
   * Return all loans
   *
   * @returns {Observable<LoanEntity[] | void>}
   */
  findAll = (): Observable<LoanEntity[] | void> => {
    return of(this._loans).pipe(
      map((loans: LoanEntity[]) =>
        !!loans && !!loans.length
          ? loans.map((loan: Loan) => new LoanEntity(loan))
          : undefined,
      ),
    );
  };

  /**
   * Create a new loan
   *
   * @param {LoanInCreation} createLoanDto data to create a new loan
   * @returns {Observable<LoanEntity>}
   */
  create = (createLoanDto: LoanInCreation): Observable<LoanEntity> => {
    return from(this._loans).pipe(
      find((loan: Loan) => loan.id === createLoanDto.id),
      map((loan: Loan) => {
        if (loan) {
          throw new Error(`Loan with id ${createLoanDto.id} already exists`);
        }

        this._loans.push(createLoanDto as Loan);
        return new LoanEntity(createLoanDto);
      }),
    );
  };

  /**
   * Update a loan
   *
   * @param {UUIDTypes} id id of the loan to update
   * @param {LoanInModification} updateLoanDto data to update the loan
   * @returns {Observable<LoanEntity>}
   */
  update = (
    id: UUIDTypes,
    updateLoanDto: LoanInModification,
  ): Observable<LoanEntity> => {
    return from(this._loans).pipe(
      find((loan: Loan) => loan.id === id),
      map((loan: Loan) => {
        if (!loan) {
          throw new Error(`Loan with id ${id} not found`);
        }

        const updatedLoan = { ...loan, ...updateLoanDto, id: id.toString() };
        this._loans = this._loans.map((l: Loan) =>
          l.id === id.toString() ? updatedLoan : l,
        );
        return new LoanEntity(updatedLoan);
      }),
    );
  };

  /**
   * Delete a loan
   *
   * @param {UUIDTypes} id id of the loan to delete
   * @returns {Observable<LoanEntity>}
   */
  delete = (id: UUIDTypes): Observable<LoanEntity> => {
    return from(this._loans).pipe(
      find((loan: Loan) => loan.id === id),
      map((loan: Loan) => {
        if (!loan) {
          throw new Error(`Loan with id ${id} not found`);
        }

        this._loans = this._loans.filter((l: Loan) => l.id !== id);
        return new LoanEntity(loan);
      }),
    );
  };
}
