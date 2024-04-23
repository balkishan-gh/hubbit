import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useEditPostModal from "../hooks/useEditPostModal";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { cn } from "../../@/lib/utils";

const CreatePostModal = ({ isOpen, userUsername }) => {
  const router = useRouter();
  const [desc, setDesc] = useState("");
  const session = useSession();
  const editPostModal = useEditPostModal();
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
            try {
              const response = await axios.post("/api/create-post", {
                postDescription: desc,
                userId: session.data.user.email,
              });
              console.log(response);
              console.log("Your post is submitted successfully");
              setDesc("");
              editPostModal.onClose();
            } catch (err) {
              console.log(err);
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
          <button className="w-full py-2 border-[2px] rounded-lg border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
