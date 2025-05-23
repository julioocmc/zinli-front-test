import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HeartIcon as HeartOutline,
  HeartIcon as HeartSolid,
} from '@heroicons/react/24/solid';
import type { User } from '../../types/user';
import { LikeListModal } from './LikeListModal';
interface Props {
  likes: User[];
  hasLiked: boolean;
  onToggle: () => void;
}

export function PostFooter({ likes, hasLiked, onToggle }: Props) {
  const [open, setOpen] = useState(false);

  const count = likes.length;
  const first = count ? likes[0].username : '';
  const others = count > 1 ? count - 1 : 0;

  return (
    <>
      <div className="flex items-center gap-2">
        <motion.button
          onClick={onToggle}
          whileTap={{ scale: 0.8 }}
          animate={{ scale: hasLiked ? 1.2 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          aria-pressed={hasLiked}
          className="cursor-pointer"
        >
          {hasLiked ? (
            <HeartSolid className="w-4 h-4 text-red-500" />
          ) : (
            <HeartOutline className="w-4 h-4 text-text-200" />
          )}
        </motion.button>

        {count > 0 && (
          <p className="text-sm">
            {count === 1 ? (
              `Le gusta a ${first}`
            ) : (
              <>
                Le gusta a {first}{' '}
                <button
                  onClick={() => setOpen(true)}
                  className="underline hover:text-accent-100 cursor-pointer"
                >
                  y a {others} más
                </button>
              </>
            )}
          </p>
        )}
      </div>

      <LikeListModal
        likes={likes}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
