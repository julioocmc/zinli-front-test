export function PostImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className="max-w-full max-h-[300px] object-cover rounded mb-2 mx-auto"
    />
  );
}
