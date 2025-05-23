type Tab = 'published' | 'drafted' | 'deleted';

interface Props {
  current: Tab;
  onChange: (t: Tab) => void;
}

export function ProfileTabs({ current, onChange }: Props) {
  const labels: Record<Tab, string> = {
    published: 'Publicados',
    drafted: 'Borradores',
    deleted: 'Eliminados',
  };

  return (
    <div className="flex justify-center gap-4 font-semibold">
      {(Object.keys(labels) as Tab[]).map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-4 py-1 rounded-lg cursor-pointer text-sm ${
            current === t ? 'bg-accent-100 text-white' : 'bg-bg-300'
          }`}
        >
          {labels[t]}
        </button>
      ))}
    </div>
  );
}
