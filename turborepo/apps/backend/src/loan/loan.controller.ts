import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoanEntity } from './entities/loan.entity';
import { LoanService } from './loan.service';
import { LoanInModification, LoanInCreation } from '../APITypes/LoanType';
import { UUIDTypes } from 'uuid';

@Controller('loan')
export class LoanController {
  constructor(private readonly _loanService: LoanService) {}

  /**
   * Handler to answer to GET /loan route
   *
   * @returns Observable<LoanEntity[] | void> List of loans
   */
  @Get()
  findAll(): Observable<LoanEntity[] | void> {
    return this._loanService.findAll();
  }

  /**
   * Handler to answer to POST /loan route
   *
   * @param createLoanDto data to create a new loan
   * @returns Observable<LoanEntity>
   */
  @Post()
  create(@Body() createLoanDto: LoanInCreation): Observable<LoanEntity> {
    return this._loanService.create(createLoanDto);
  }

  /**
   * Handler tu PUT /loan/:id route
   *
   * @param id id of the loan to update
   * @param updateLoanDto data to update the loan
   * @returns Observable<LoanEntity>
   */
  @Put(':id')
  update(
    @Param('id') id: UUIDTypes,
    @Body() updateLoanDto: LoanInModification,
  ): Observable<LoanEntity> {
    return this._loanService.update(id, updateLoanDto);
  }

  /**
   * Handler to DELETE /loan/:id route
   *
   * @param id id of the loan to delete
   * @returns Observable<LoanEntity>
   */
  @Delete(':id')
  delete(@Param('id') id: UUIDTypes): Observable<LoanEntity> {
    return this._loanService.delete(id);
  }
}
