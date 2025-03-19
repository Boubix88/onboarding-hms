import { Link } from 'react-router-dom';
import reeadyLogo from '../assets/reeady.svg';


function Navbar() {
  return (
    <div className="p-2 pb-3 text-xl font-bold text-white flex justify-between items-center">
      <div className="flex items-center">
      <Link to="/" className='flex items-center'>
            <img src={reeadyLogo} alt="Logo" className='h-8' />
          <span className="ml-2 text-reeady-yellow">OnBoarding HMS</span>
        </Link>
      </div>

      <div className="flex space-x-6">
        <div className="flex items-center">
          <Link to="/loanList" className="text-sm text-reeady-yellow transition duration-200">
            Liste des prêts
          </Link>
        </div>

        <div className="flex items-center">
          <Link to="/createLoan" className="text-sm text-reeady-yellow transition duration-200">
            Créer un prêt
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;