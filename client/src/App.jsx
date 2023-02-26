import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import './assets/css/styles.css';
import ColoModeSwitch from './components/ColoModeSwitch';
import { useAuthState } from './contexts';
const Home = lazy(() => import('./views/Home'));
const Login = lazy(() => import('./views/Login'));
const Account = lazy(() => import('./views/Account'));

function App() {
  const user = useAuthState();

  return (
    <ChakraProvider theme={theme}>
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} exact />

            <Route path="/login" element={<Login />} exact />

            {user.authenticated && (
              <Route path="/account" element={<Account />} exact />
            )}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </Suspense>

      <ColoModeSwitch />
    </ChakraProvider>
  );
}

export default App;
