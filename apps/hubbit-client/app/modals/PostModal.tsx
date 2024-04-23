import usePostModal from "../hooks/usePostModal";
import { Trash, Edit } from "lucide-react";
import DeletePostModal from "./DeletePostModal";
import useDeletePostModal from "../hooks/useDeletePostModal";
import useEditPostModal from "../hooks/useEditPostModal";
import EditPostModal from "./EditPostModal";

const PostModal = ({ isOpen, userUsername, postId }) => {
  const postModal = usePostModal();
  const editPostModal = useEditPostModal();
  const deletePostModal = useDeletePostModal();
  if (!isOpen) return null;
  return (
    <div className="absolute flex items-center justify-center gap-2 top-5 right-3 bg-white">
      <Trash
        className="text-red-500 cursor-pointer"
        onClick={deletePostModal.onOpen}
      />
      <DeletePostModal
        isOpen={deletePostModal.isOpen}
        postId={postId}
        userUsername={userUsername}
      />
      <Edit
        className="text-indigo-600 cursor-pointer"
        onClick={editPostModal.onOpen}
      />
      <EditPostModal
        isOpen={editPostModal.isOpen}
        postId={postId}
        userUsername={userUsername}
      />
    </div>
  );
};

export default PostModal;
