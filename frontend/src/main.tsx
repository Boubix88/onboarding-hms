import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoutesFromElements, Route } from 'react-router-dom';
import CreateLoan from './Vues/CreateLoan.tsx';
import ListLoan from './Vues/LoanList.tsx';
import Layout from './Utils/Layout.tsx';

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>

    <Route
      path="createLoan"
      element={<CreateLoan />}
    />
    <Route
      path="loanList"
      element={<ListLoan />}
    />
  </Route>
);

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);