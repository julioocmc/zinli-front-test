import { useEffect } from 'react';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // duración seg
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center h-screen bg-bg-200">
      <img
        src="/zinli-logo.png"
        alt="Logo"
        className="w-50 h-50 animate-pulse"
      />
    </div>
  );
}
