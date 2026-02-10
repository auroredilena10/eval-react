import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { ThemeProvider } from "@/components/theme-provider"
import { Home } from './pages/home/home';
import NotFound from './pages/not-found';
import Loading from './pages/loading';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
