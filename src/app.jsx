import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/home/home';
import ContractsContainer from '@/pages/contracts/contractsContainer';
import DetailsContractContainer from '@/pages/contracts/detailsContract/detailsContract';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/contracts" element={<ContractsContainer />} />
        <Route path="/contracts/details/:id" element={<DetailsContractContainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
