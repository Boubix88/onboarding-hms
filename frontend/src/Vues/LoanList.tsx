import { use, useEffect, useState } from "react";
import { Loan, LoanInModification } from "../APITypes/LoanType";
import LoanCard from "../Components/LoanCard";
import LoanAPI from "../ModelAPIs/LoanAPI";
import { UUIDTypes } from "uuid";
import Notification from "../Utils/PopUpAlert";

function ListLoan() {
  const [loanData, setLoanData] = useState<Loan[]>([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showNotification, setShowNotification] = useState(false);

  // Récupération des prêts
  useEffect(() => {
    fetchAllLoan();
  }, []);

  // Utilisation de useEffect pour fermer la notification après 3 secondes
  useEffect(() => {
    if (showNotification) {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);

        return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Récupération de tous les prêts
  function fetchAllLoan() {
    const loanResponse = LoanAPI.getAllLoan();
    setLoanData(loanResponse);
  }

  // Modification d'un prêt
  function modifyLoan(loan: LoanInModification) {
    const loanResponse = LoanAPI.modifyMontantLoanById(loan);
    fetchAllLoan();
    setNotification({ message: loanResponse, type: 'success' });
    setShowNotification(true);
  }

  // Suppression d'un prêt
  function deleteLoan(id: UUIDTypes) {
    const loanResponse = LoanAPI.deleteLoanById(id);
    fetchAllLoan();
    setNotification({ message: loanResponse, type: 'success' });
    setShowNotification(true);
  }


  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-6 text-reeady-yellow">Liste des prêts</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-6 p-6">

        {/* Liste des prêts */}
        {loanData.length > 0 && loanData.map((loan: Loan, index: number) => (
          <LoanCard 
            key={index} 
            loan={loan}
            modifyLoan={modifyLoan}
            deleteLoan={deleteLoan}
          />
        ))}

        {/* Aucun prêt */}
        {loanData.length === 0 && (
          <div className="text-white text-center w-full col-span-4">
            <p>Aucun prêt disponible</p>
          </div>
        )}
      </div>

      {/* Notification */}
      {showNotification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
}

export default ListLoan;