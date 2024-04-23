"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreatePost = () => {
  const session = useSession();
  const router = useRouter();
  const [desc, setDesc] = useState("");
  return (
    <div className="m-4">
      <div className="w-full md:w-2/3 text-lg text-indigo-600 text-left mb-2 relative left-1/2 -translate-x-1/2">
        Want to say something?
      </div>
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
            router.push("/feed");
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <textarea
          name="postDescription"
          className="w-full md:w-2/3 rounded-lg border-indigo-600 bg-indigo-100"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
        ></textarea>
        <button className="border border-indigo-600 px-10 py-2 rounded-lg bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
