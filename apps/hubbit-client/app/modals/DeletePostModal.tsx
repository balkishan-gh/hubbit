"use client";

import { useSession } from "next-auth/react";
import { cn } from "../../@/lib/utils";
import axios from "axios";
import useDeletePostModal from "../hooks/useDeletePostModal";
import { IoMdClose } from "react-icons/io";

const DeletePostModal = ({ isOpen, userUsername, postId }) => {
  const session = useSession();
  const deletePostModal = useDeletePostModal();
  const isValid = session.data.user.email === userUsername;
  const deletePost = async () => {
    if (isValid) {
      try {
        const response = await axios.post("/api/delete-post", {
          postId: postId,
        });
        console.log(response);
        console.log("Your post is deleted successfully");
        deletePostModal.onClose();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("You can't delete this post");
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-neutral-800/70 z-50">
      <div className="w-[90%] md:w-1/2 lg:w-[30%] bg-white rounded-lg relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
        <IoMdClose
          className="absolute cursor-pointer"
          onClick={deletePostModal.onClose}
        />
        <div className="text-center mb-2">Are you absolutely sure?</div>
        <div className="text-center mb-2">
          This action cannot be undone. This will permanently delete your post
          and remove your data from our servers.
        </div>
        <button
          onClick={deletePost}
          className={cn(
            "w-full py-2 border-[2px] rounded-lg",
            isValid
              ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              : "bg-gray-500 text-white cursor-not-allowed"
          )}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeletePostModal;
