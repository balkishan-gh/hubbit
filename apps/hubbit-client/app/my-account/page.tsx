"use client";

import Image from "next/image";
import Post from "../_components/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const imgUrl =
  "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

const MyAccount = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/find-my-posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  const indexOfAtSign = data?.user?.email.indexOf("@");
  const truncatedUserUserName = data?.user?.email.substring(0, indexOfAtSign);

  return (
    <div className="m-4">
      <div className="flex gap-2 md:gap-10 overflow-hidden mb-2">
        <div className="flex flex-col gap-2">
          <div>
            <Image
              width={60}
              height={60}
              alt="Profile Pic"
              src={imgUrl}
              className="rounded-full border-[2px] border-indigo-600"
            />
          </div>
          <div>
            <div>{data?.user?.name}</div>
            <div>@{truncatedUserUserName}</div>
          </div>
        </div>
        <div className="flex items-start justify-center gap-2 md:gap-10">
          <div className="hidden md:flex flex-col items-center justify-center p-3">
            <div>100</div>
            <div>Posts</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3">
            <div>100</div>
            <div>Followers</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3">
            <div>100</div>
            <div>Following</div>
          </div>
        </div>
      </div>
      <div className="bg-indigo-100 p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {posts.map((p) => (
          <Post
            userAvatar="#"
            postId={p.id}
            userName={p.user.name}
            userUsername={p.userId}
            postImage="#"
            postDescription={p.postDescription}
            onHeartClick={() => {
              // Handle heart click
            }}
            onCommentClick={() => {
              // Handle comment click
            }}
            onShareClick={() => {
              // Handle share click
            }}
            likeCount={10}
            commentCount={10}
            shareCount={10}
          />
        ))}
      </div>
    </div>
  );
};

export default MyAccount;
