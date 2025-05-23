import type { User } from '../../types/user';
import { Modal, ModalBody, ModalHeader } from '../Modal';

interface Props {
  likes: User[];
  isOpen: boolean;
  onClose: () => void;
}

export function LikeListModal({ likes, isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Le gusta a:</ModalHeader>
      <ModalBody>
        {likes.map((u) => (
          <p key={u.username} className="py-1 border-b last:border-none">
            {u.username}
          </p>
        ))}
      </ModalBody>
    </Modal>
  );
}
