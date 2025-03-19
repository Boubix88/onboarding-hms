import { useEffect, useState } from "react";
import { Loan, LoanInModification } from "@types/loan";
import LoanCard from "../Components/LoanCard";
import LoanAPI from "../ModelAPIs/LoanAPI";
import { UUIDTypes } from "uuid";
import { PopUpAlert as Notification } from "@ui/popup-alert";

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
      LoanAPI.getAllLoans().then((loanResponse) => {
          setLoanData(loanResponse);
          setNotification({ message: 'Prêts récupérés avec succès', type: 'success' });
          setShowNotification(true);
      }).catch((error) => {
          setNotification({ message: 'Erreur dans la récupèration des prêts', type: 'error' });
          setShowNotification(true);
      });
  }

  // Modification d'un prêt
  function modifyLoan(id: UUIDTypes, loan: LoanInModification) {
      LoanAPI.moddifyMontantLoanById(id, loan).then((loanResponse) => {
          fetchAllLoan();
          setNotification({ message: 'Prêt modifié avec succès', type: 'success' });
          setShowNotification(true);
      }
      ).catch((error) => {
          setNotification({ message: 'Erreur dans la modification du prêt', type: 'error' });
          setShowNotification(true);
      });
  }

  // Suppression d'un prêt
  function deleteLoan(id: UUIDTypes) {
      LoanAPI.deleteLoanById(id).then((loanResponse) => {
          fetchAllLoan();
          setNotification({ message: "Prêt supprimé avec succès", type: 'success' });
          setShowNotification(true);
      }
      ).catch((error) => {
          setNotification({ message: 'Erreur dans la suppression du prêt', type: 'error' });
          setShowNotification(true);
      });
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