import type { RefObject } from 'react';

interface Props {
  onExport: () => void;
  onTriggerImport: () => void;
  onImport: React.ChangeEventHandler<HTMLInputElement>;
  fileRef: RefObject<HTMLInputElement> | null;
}

export function JsonButtons({
  onExport,
  onTriggerImport,
  onImport,
  fileRef,
}: Props) {
  return (
    <div className="flex gap-3 justify-end">
      <button
        onClick={onExport}
        className="px-3 py-1 text-sm bg-accent-100 rounded-lg cursor-pointer"
      >
        Exportar JSON
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        onChange={onImport}
        className="hidden"
      />
      <button
        onClick={onTriggerImport}
        className="px-3 py-1 text-sm bg-bg-300 rounded-lg cursor-pointer"
      >
        Importar JSON
      </button>
    </div>
  );
}
