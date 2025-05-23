import { useRef } from 'react';

interface Props {
  src: string;
  onChange: (b64: string) => void;
  onClear: () => void;
}

export function AvatarInput({ src, onChange, onClear }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-start">
      <label
        htmlFor="avatar-upload"
        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-bg-300 text-text-100 rounded select-none w-full"
      >
        Avatar (opcional)
      </label>
      <input
        id="avatar-upload"
        ref={fileRef}
        type="file"
        accept="image/png"
        onChange={handleFile}
        className="hidden"
      />

      {src && (
        <div className="relative mt-2">
          <img
            src={src}
            alt="Vista previa avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-bg-300"
          />
          <button
            type="button"
            onClick={() => {
              onClear();
              if (fileRef.current) fileRef.current.value = '';
            }}
            className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-white text-xs flex items-center justify-center"
            aria-label="Eliminar avatar"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
