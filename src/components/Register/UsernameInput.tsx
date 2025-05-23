import { useState } from 'react';
import { useUsernameCheck } from '../../hooks/useUsernameCheck';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function UsernameInput({ value, onChange }: Props) {
  const { checking, check } = useUsernameCheck();
  const [verified, setVerified] = useState(false);

  const handleVerify = async () => {
    const ok = await check(value);
    setVerified(ok);
  };

  return (
    <div className="relative w-full">
      <input
        name="username"
        placeholder="Username"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setVerified(false);
        }}
        className="p-2 rounded bg-bg-100 text-text-100 placeholder-text-200 w-full pr-28"
        required
      />
      <button
        type="button"
        onClick={handleVerify}
        disabled={checking}
        className="absolute top-1/2 right-1.5 -translate-y-1/2 bg-bg-300 rounded px-3 py-1 text-sm disabled:opacity-50 cursor-pointer"
      >
        {checking ? 'Verificando...' : verified ? '✓' : 'Verificar'}
      </button>
    </div>
  );
}
