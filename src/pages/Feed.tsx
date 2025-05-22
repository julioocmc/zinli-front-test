import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';
import { usePosts } from '../hooks/usePosts';
import PostForm from '../components/PostForm';

export default function Feed() {
  const { user } = useAuth();
  const { posts, addPost } = usePosts();

  const publishedPosts = posts
    .filter((post) => post.status === 'published') // Mostrar solo los publicados
    .sort(
      (a, b) =>
        new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
    );

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-bg-200 text-text-100">
        <Navbar />
        <main className="flex-grow p-4 text-center">
          <p>No has iniciado sesión.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-200 text-text-100">
      <Navbar />

      <main className="flex-grow p-4 max-w-2xl mx-auto w-full">
        <PostForm addPost={addPost} currentUser={user} />

        <h1 className="text-2xl font-bold mb-4">Publicaciones recientes</h1>

        {publishedPosts.length === 0 ? (
          <p className="text-center text-text-200">No hay publicaciones aún.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {publishedPosts.map((post, index) => (
              <PostCard key={index} post={post} index={index} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
