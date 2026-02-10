import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { Home } from './pages/home/home';
import NotFound from './pages/not-found';
import Loading from './pages/loading';

const App = () => {
  return (
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  )
}

export default App
