"use client";

import { useSession } from "next-auth/react";
import { cn } from "../../@/lib/utils";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import useEditPostModal from "../hooks/useEditPostModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EditPostModal = ({ isOpen, userUsername, postId }) => {
  const router = useRouter();
  const [desc, setDesc] = useState("");
  const session = useSession();
  const editPostModal = useEditPostModal();
  const isValid = session.data?.user?.email === userUsername;
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-neutral-800/70 z-50">
      <div className="w-[90%] md:w-1/2 lg:w-[30%] bg-white rounded-lg relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
        <IoMdClose
          className="absolute  top-5 left-5 cursor-pointer"
          onClick={editPostModal.onClose}
        />
        <form
          className="flex flex-col items-center justify-center gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            // console.log(desc);
            console.log(session);
            if (isValid) {
              try {
                const response = await axios.post("/api/edit-post", {
                  postDescription: desc,
                  postId: postId,
                });
                console.log(response);
                console.log("Your post is updated successfully");
                setDesc("");
                editPostModal.onClose();
              } catch (err) {
                console.log(err);
              }
            } else {
              console.log("You can't edit this post");
            }
          }}
        >
          <textarea
            name="postDescription"
            rows={5}
            className="w-full rounded-lg border-indigo-600 bg-indigo-100"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            value={desc}
          ></textarea>
          <button
            className={cn(
              "w-full py-2 border-[2px] rounded-lg",
              isValid
                ? "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                : "bg-gray-500 text-white cursor-not-allowed"
            )}
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
