"use client";

import NewPostButton from "../_components/NewPostButton";
import Post from "../_components/Post";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
// import getCurrentUser from "../actions/getCurrentUser";
import { signOut, useSession } from "next-auth/react";
import PostModal from "../modals/PostModal";
import usePostModal from "../hooks/usePostModal";
import useEditPostModal from "../hooks/useEditPostModal";
import EditPostModal from "../modals/EditPostModal";
import CreatePostModal from "../modals/CreatePost";

const POST_DESCRIPTION = "My name is Bal Kishan";

const Feed = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const postModal = usePostModal();
  const editPostModal = useEditPostModal();
  const session = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const handleClose = (selectedPostId) => {
    setSelectedPostId(selectedPostId);
  };

  useEffect(() => {
    axios.get("/api/find-posts").then((response) => {
      setPosts(response.data);
      console.log(response.data);
    });
  }, []);

  console.log("Your session");
  console.log(session);

  if (session.status === "unauthenticated") {
    router.push("/signin");
  }

  // const onHeartClick = async (id, userId) => {
  //   const response = await axios.post("/api/like-post", {
  //     postId: id,
  //     userId: session.data.user.email,
  //   });
  //   // const updatedPosts = posts.map((post) => {
  //   //   if (post.id === id) {
  //   //     return { ...post, likeCount: response.data };
  //   //   }
  //   //   return post;
  //   // });
  // };

  return (
    <>
      <div className="flex justify-center p-2">
        <button
          className="border border-indigo-600 px-10 py-2 rounded-lg bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white"
          onClick={() => {
            signOut({ redirect: false });
          }}
        >
          Logout
        </button>
      </div>
      <div className="bg-indigo-100 p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <NewPostButton
          onClick={() => {
            // router.push("/create-post");
            editPostModal.onOpen();
          }}
        />
        <CreatePostModal isOpen={editPostModal.isOpen} />
        {posts.map((p) => (
          <Post
            key={p.id}
            isSelected={p.id === selectedPostId}
            userAvatar="#"
            postId={p.id}
            userName={p.user.name}
            userUsername={p.userId}
            postImage="#"
            postDescription={p.postDescription}
            // onHeartClick={onHeartClick}
            onCommentClick={() => {
              // Handle comment click
            }}
            onShareClick={() => {
              // Handle share click
            }}
            // likeCount={p.likes.length}
            totalLikes={p.likes.length}
            commentCount={10}
            shareCount={10}
            handleClose={handleClose}
            liked={p.likes.includes(session.data.user.email)}
          />
        ))}
      </div>
    </>
  );
};

export default Feed;

{
  /* <NewPostButton
          onClick={() => {
            router.push("/create-post");
          }}
        />
        <Post
          userAvatar={URL}
          userName="User Name"
          userUsername="user_username"
          postImage={POST_URL}
          postDescription={POST_DESCRIPTION}
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
        <Post
          userAvatar={URL}
          userName="User Name"
          userUsername="user_username"
          postImage={POST_URL}
          postDescription={POST_DESCRIPTION}
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
        <Post
          userAvatar={URL}
          userName="User Name"
          userUsername="user_username"
          postImage={POST_URL}
          postDescription={POST_DESCRIPTION}
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
        <Post
          userAvatar={URL}
          userName="User Name"
          userUsername="user_username"
          postImage={POST_URL}
          postDescription={POST_DESCRIPTION}
          onHeartClick={() => {
            // setLikeCount((prevCount) => {
            //   return prevCount++;
            // });
            setLikeCount((prevCount) => prevCount + 1);
            console.log(likeCount);
          }}
          onCommentClick={() => {
            // Handle comment click
          }}
          onShareClick={() => {
            // Handle share click
          }}
          likeCount={likeCount}
          commentCount={10}
          shareCount={10}
        /> */
}
