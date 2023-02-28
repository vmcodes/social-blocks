import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import './assets/css/styles.css';
import Header from './components/Header';
import { useAuthState } from './contexts';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop/BackToTop';
const Home = lazy(() => import('./views/Home'));
const Profile = lazy(() => import('./views/Profile'));
const Login = lazy(() => import('./views/Login'));
const Account = lazy(() => import('./views/Account'));

function App() {
  const user = useAuthState();

  return (
    <ChakraProvider theme={theme}>
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} exact />

            <Route path="/:slug" element={<Profile />} />

            <Route path="/login" element={<Login />} exact />

            {user.authenticated && (
              <Route path="/account/:address" element={<Account />} />
            )}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
          <BackToTop />
        </BrowserRouter>
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
