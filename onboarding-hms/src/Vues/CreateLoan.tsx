import { Loan } from "APITypes/LoanType";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from 'clsx';
import { schemaLoan } from "../Validation/loanValidator";
import LoanAPI from "../ModelAPIs/LoanAPI";
import Notification from "../Utils/PopUpAlert";

function CreateLoan() {
  const [showLoanSimulation, setShowLoanSimulation] = useState(false);
  const [loan, setLoan] = useState<Loan>();

  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showNotification, setShowNotification] = useState(false);

  const [showOtherField, setShowOtherField] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schemaLoan),
  });

  const bienValue = watch("bien");

  // Utilisation de useEffect pour afficher le champ "Autres" si le bien est "Autres"
  useEffect(() => {
    setShowOtherField(bienValue === "Autres");
  }, [bienValue]);

  // Fonction de soumission du formulaire
  function onSubmitHandler(data: any) {
    console.log(data);
    reset();

    const loan: Loan = {
      name: data.bien === "Autres" ? data.autreBien : data.bien,
      montant_emprunt: data.montant,
      taux_interet: data.taux,
      duree_emprunt: data.duree,
    };

    // On crée le prêt
    const loanResponse = LoanAPI.addLoan(loan);

    setLoan(loan);
    setShowLoanSimulation(true);

    setNotification({ message: loanResponse, type: 'success' });
    setShowNotification(true);
  }

  // Utilisation de useEffect pour fermer la notification après 3 secondes
  useEffect(() => {
    if (showNotification) {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);

        return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div className="container mx-auto">
      {!showLoanSimulation && (
        <>
          <h1 className="text-3xl font-bold text-center mt-6 text-reeady-yellow">Création d'un crédit</h1>
          <div className="grid grid-cols-1">

            {/* Création d'un crédit */}
            <div className="shadow-lg p-4 rounded-xl mx-auto mt-6 w-100 bg-reeady-dark-green">
              <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="mb-5">
                  <label htmlFor="bien" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Type de bien</label>
                  <select {...register("bien")} id="bien" className={clsx("text-sm rounded-lg block w-full p-2.5", {"bg-gray-50 border border-red-300 text-red-900  focus:ring-red-500 focus:border-red-500  dark:bg-gray-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500": errors.bien, "bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500": !errors.bien})}>
                    <option>Maison</option>
                    <option>Appartement</option>
                    <option>Travaux</option>
                    <option>Autres</option>
                  </select>
                  <p className="text-red-400">{errors.bien?.message}</p>
                </div>
                {showOtherField && (
                  <div className="mb-5">
                    <label htmlFor="otherBien" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Nom du bien</label>
                    <input {...register("autreBien")} type="text" id="otherBien" className={clsx("text-sm rounded-lg block w-full p-2.5", {"bg-gray-50 border border-red-300 text-red-900  focus:ring-red-500 focus:border-red-500  dark:bg-gray-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500": errors.autreBien, "bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500": !errors.autreBien})} placeholder="Nom du bien" />
                    <p className="text-red-400">{errors.autreBien?.message}</p>
                  </div>
                )}
                <div className="mb-5">
                  <label htmlFor="montant" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Prix du bien</label>
                  <input {...register("montant")} type="number" id="montant" className={clsx("text-sm rounded-lg block w-full p-2.5", {"bg-gray-50 border border-red-300 text-red-900  focus:ring-red-500 focus:border-red-500  dark:bg-gray-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500": errors.montant, "bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500": !errors.montant})} placeholder="ex: 200000" />
                  <p className="text-red-400">{errors.montant?.message}</p>
                </div>
                <div className="mb-5">
                  <label htmlFor="taux" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Taux d'interêt</label>
                  <input {...register("taux")} type="number" id="taux" className={clsx("text-sm rounded-lg block w-full p-2.5", {"bg-gray-50 border border-red-300 text-red-900  focus:ring-red-500 focus:border-red-500  dark:bg-gray-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500": errors.taux, "bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500": !errors.taux})} placeholder="ex: 1.5" step="0.1" />
                  <p className="text-red-400">{errors.taux?.message}</p>
                </div>
                <div className="mb-5">
                  <label htmlFor="duree" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Durée du prêt</label>
                  <input {...register("duree")} type="number" id="duree" className={clsx("text-sm rounded-lg block w-full p-2.5", {"bg-gray-50 border border-red-300 text-red-900  focus:ring-red-500 focus:border-red-500  dark:bg-gray-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500": errors.duree, "bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500": !errors.duree})} placeholder="ex: 20" />
                  <p className="text-red-400">{errors.duree?.message}</p>
                </div>
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer">Simuler</button>
              </form>

            </div>
          </div>
        </>
      )}

      {showLoanSimulation && (
        <>
          <h1 className="text-3xl font-bold text-center mt-6 text-reeady-yellow">Résultats de la simulation</h1>
          <div className="grid grid-cols-1">

            {/* Création d'un crédit */}
            <div className="shadow-lg p-4 rounded-xl w-80 mx-auto mt-6">
            <a href="#" onClick={() => setShowLoanSimulation(false)} className="text-center text-white text-lg underline">&#10094; Retour</a>
                <div className="mb-5">
                  <div className="flex justify-between">
                    <p className='text-white text-lg'>Type de bien</p>
                    <p className='text-reeady-yellow text-lg'>{loan.name}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className='text-white text-lg'>Montant</p>
                    <p className='text-reeady-yellow text-lg'>{loan.montant_emprunt} €</p>
                  </div>
                </div>
                <hr></hr>
                <div className="mb-5">
                  <div className="flex justify-between">
                    <p className='text-white text-lg'>Mensualité</p>
                    <p className='text-reeady-yellow text-lg'>{parseInt(Number.parseFloat(((loan.montant_emprunt * (1 + loan.taux_interet / 100)) / (loan.duree_emprunt * 12)).toFixed(0)).toString())} € / mois</p>
                  </div>
                  <div className="flex justify-between">
                    <p className='text-white text-lg'>Durée</p>
                    <p className='text-reeady-yellow text-lg'>{loan.duree_emprunt} ans</p>
                  </div>
                  <div className="flex justify-between">
                    <p className='text-white text-lg'>Taux</p>
                    <p className='text-reeady-yellow text-lg'>{loan.taux_interet} %</p>
                  </div>
                </div>
                <hr></hr>
                <div className="mb-5 flex justify-between">
                  <p className='text-white text-lg'>Coût total</p>
                  <p className='text-reeady-yellow text-lg'>{Math.round(loan.montant_emprunt * (1 + loan.taux_interet / 100))} €</p>
                </div>
            </div>
          </div>
        </>
      )}

      {/* Notification */}
      {showNotification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
}

export default CreateLoan;