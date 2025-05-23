/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { usePostImportExport } from '../hooks/usePostImportExport';
import { toast } from 'sonner';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { JsonButtons } from '../components/Profile/JsonButtons';
import { ProfileTabs } from '../components/Profile/ProfileTabs';
import { PostList } from '../components/Profile/PostList';
type Tab = 'published' | 'drafted' | 'deleted';

export default function Profile() {
  const { user } = useAuth();
  const { posts, updateStatus } = usePosts();
  const [tab, setTab] = useState<Tab>('published');

  if (!user) return null;

  const { exportMyPosts, triggerImport, handleImport, fileRef } =
    usePostImportExport(user.username);

  const filtered = posts
    .filter((p) => p.author.username === user.username && p.status === tab)
    .sort((a, b) => b.create_at.getTime() - a.create_at.getTime());

  const publish = (id: string) => {
    updateStatus(id, 'published');
    toast.success('¡Publicado!');
  };
  const remove = (id: string) => {
    updateStatus(id, 'deleted');
    toast.success('Eliminado');
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-200 text-text-100">
      <Navbar />
      <main className="flex-grow p-4 max-w-2xl mx-auto w-full space-y-6">
        <ProfileHeader user={user} />

        {tab === 'published' && (
          <JsonButtons
            onExport={exportMyPosts}
            onTriggerImport={triggerImport}
            onImport={handleImport}
            fileRef={fileRef}
          />
        )}

        <ProfileTabs current={tab} onChange={setTab} />

        <PostList
          posts={filtered}
          tab={tab}
          onPublish={publish}
          onDelete={remove}
        />
      </main>
      <Footer />
    </div>
  );
}
