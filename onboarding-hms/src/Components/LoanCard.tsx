"use client"; 

import {useEffect, useState} from 'react';
import { Loan, LoanInModification } from '../APITypes/LoanType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock, faLineChart, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import LoanAPI from '../ModelAPIs/LoanAPI';
import { UUIDTypes } from 'uuid';


interface LoanCardProps {
    loan: Loan;
    modifyLoan: (loan: LoanInModification) => void;
    deleteLoan: (id: UUIDTypes) => void;
  }

function LoanCard({ loan, modifyLoan, deleteLoan }: LoanCardProps) {
    const [montantEmprunt, setMontantEmprunt] = useState(loan.montant_emprunt);
    const [mensualite, setMensualite] = useState(Math.round((loan.montant_emprunt * (1 + loan.taux_interet / 100)) / loan.duree_emprunt));

    // On actualise le montant des mensualités à chaque changement du montant de l'emprunt
    useEffect(() => {
        // Modification du montant de l'emprunt
        modifyLoan({id: loan.id, montant_emprunt: montantEmprunt });

        setMensualite(Math.round((montantEmprunt * (1 + loan.taux_interet / 100)) / loan.duree_emprunt));
    }, [montantEmprunt]);

    // Suppression du prêt
    function handleDeleteLoan() {
        deleteLoan(loan.id);
    }

    return (
        <div className="shadow-lg p-4 rounded-xl bg-reeady-dark-green">
            <div className='relative flex justify-between items-center'>
                <p className='text-white text-lg font-bold'>{loan.name}</p>
                <button onClick={handleDeleteLoan} title='Supprimer le prêt' className="text-red-400 text-lg font-bold cursor-pointer">✖</button>
            </div>
            <div className="flex justify-between items-center">
                <p className='text-white text-base flex items-center gap-2' style={{ maxWidth: '80%' }}>
                    <FontAwesomeIcon icon={faMoneyBill} className="w-5 h-5 text-reeady-yellow" /> 
                    Montant:
                    <input 
                        type="number" 
                        id="quantity-input" 
                        data-input-counter aria-describedby="helper-text-explanation" 
                        className="bg-gray-50 border-x-0 border-gray-300 h-5 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-2" 
                        value={montantEmprunt} 
                        onChange={(e) => setMontantEmprunt(Number(e.target.value))} 
                        required 
                        step="10000"
                        min="10000"
                        max="1000000"
                        style={{ 
                            width: `calc(${montantEmprunt.toString().length + 1}ch + 1.5rem)`,
                            maxWidth: '70%'
                            }} />
                    €
                </p>
            </div>
            <p className='text-white text-base flex items-center gap-2'><FontAwesomeIcon icon={faLineChart} className='w-5 h-5 text-reeady-yellow' /> Interêt: {loan.taux_interet} %</p>
            <p className='text-white text-base flex items-center gap-2'><FontAwesomeIcon icon={faClock} className='w-5 h-5 text-reeady-yellow' /> Durée: {loan.duree_emprunt} ans</p>
            <p className='text-white text-base flex items-center gap-2'><FontAwesomeIcon icon={faCalendar} className='w-5 h-5 text-reeady-yellow' /> Mensualité: {mensualite} €</p>
        </div>
    );
}

export default LoanCard;