import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <AuthProvider>
          <Toaster position="bottom-center" richColors />
          <AppRoutes />
        </AuthProvider>
      )}
    </>
  );
}

export default App;
