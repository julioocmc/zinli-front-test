import type { User } from '../../types/user';

export function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={user.avatar || '/DummyPFP.jpeg'}
        alt={user.username}
        className="w-16 h-16 rounded-full object-cover border-2 border-white"
      />
      <div>
        <h2 className="text-xl font-bold">{user.username}</h2>
        <p className="text-text-200">
          {user.name} {user.surname}
        </p>
      </div>
    </div>
  );
}
