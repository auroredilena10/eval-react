import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/home/home';
import ContractsContainer from '@/pages/contracts/contractsContainer';
import DetailsContractContainer from '@/pages/contracts/detailsContract/detailsContractContainer';
import CreateContractContainer from '@/pages/contracts/createContract/createContractContainer';
import EditContractContainer from '@/pages/contracts/editContract/editContractContainer';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/contracts" element={<ContractsContainer />} />
        <Route path="/contracts/details/:id" element={<DetailsContractContainer />} />
        <Route path="/contracts/create" element={<CreateContractContainer />} />
        <Route path="/contracts/edit/:id" element={<EditContractContainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
