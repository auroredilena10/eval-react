import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/home/home';
import ContractsContainer from '@/pages/contracts/contractsContainer';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/contracts" element={<ContractsContainer />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
