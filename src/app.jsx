import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/home/home';
import ContractsContainer from '@/pages/contracts/contractsContainer';
import DetailsContract from '@/pages/contracts/detailsContract/detailsContract';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/contracts" element={<ContractsContainer />} />
        <Route path="/contracts/detail-contract" element={<DetailsContract />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
