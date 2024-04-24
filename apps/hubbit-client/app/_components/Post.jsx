"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { cn } from "../../@/lib/utils";
import PostModal from "../modals/PostModal";
import usePostModal from "../hooks/usePostModal";
import { Heart } from "lucide-react";

const Post = ({
  // isLiked,
  isSelected,
  postId,
  userAvatar,
  userName,
  userUsername,
  postImage,
  postDescription,
  // onHeartClick,
  onCommentClick,
  onShareClick,
  // likeCount,
  commentCount,
  shareCount,
  handleClose,
}) => {
  const postModal = usePostModal();
  const session = useSession();
  const indexOfAtSign = userUsername.indexOf("@");
  const truncatedUserUserName = userUsername.substring(0, indexOfAtSign);
  const isValid = session.data.user.email === userUsername;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const deletePost = async () => {
    if (isValid) {
      try {
        const response = await axios.post("/api/delete-post", {
          postId: postId,
        });
        console.log(response);
        console.log("Your post is deleted successfully");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("You can't delete this post");
    }
  };

  const handleOpen = () => {
    handleClose(postId);
    postModal.onOpen();
  };

  const onHeartClick = async () => {
    const response = await axios.post("/api/like-post", {
      postId: postId,
      userId: session.data.user.email,
    });
    // const updatedPosts = posts.map((post) => {
    //   if (post.id === id) {
    //     return { ...post, likeCount: response.data };
    //   }
    //   return post;
    // });
    console.log(response);
    setIsLiked(response.data.isLiked);
    setLikeCount(response.data.likeCount);
  };

  // useEffect(() => {
  //   localStorage.setItem(`post_${postId}_likeCount`, likeCount.toString());
  //   localStorage.setItem(`post_${postId}_isLiked`, isLiked.toString());
  // }, [likeCount, isLiked, postId]);

  // // Retrieve initial state values from localStorage upon component mount
  // useEffect(() => {
  //   const storedLikeCount = localStorage.getItem(`post_${postId}_likeCount`);
  //   const storedIsLiked = localStorage.getItem(`post_${postId}_isLiked`);
  //   if (storedLikeCount !== null && storedIsLiked !== null) {
  //     setLikeCount(parseInt(storedLikeCount));
  //     setIsLiked(storedIsLiked === "true");
  //   }
  // }, [postId]);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 relative">
      {/* <Dialog>
        <DialogTrigger className="absolute right-3 top-5 cursor-pointer">
          <FaEllipsisV />
        </DialogTrigger>
        <DialogContent
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-3/4 md:w-1/2 lg:w-1/4 p-4 border-[2px] rounded-lg",
            isValid ? "border-indigo-600" : "border-gray-500"
          )}
        >
          <DialogHeader className="mb-2">
            <DialogTitle className="text-center mb-2">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              post and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <button
              onClick={deletePost}
              className={cn(
                "w-full py-2 border-[2px] rounded-lg",
                isValid
                  ? "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  : "bg-gray-500 text-white cursor-not-allowed"
              )}
            >
              Delete
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog> */}
      {/* User Information */}
      <FaEllipsisV
        className="absolute right-3 top-5 cursor-pointer"
        onClick={handleOpen}
      />
      {isSelected && (
        <PostModal
          isOpen={postModal.isOpen}
          userUsername={userUsername}
          postId={postId}
        />
      )}
      {/* <PostModal isOpen={postModal.isOpen} /> */}
      <div className="flex items-center mb-4">
        <img
          src={userAvatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="font-semibold">{userName}</p>
          <p className="text-sm text-gray-600">@{truncatedUserUserName}</p>
        </div>
      </div>

      {/* Post Image */}
      {/* <img src={postImage} alt="Post" className="w-full mb-4 rounded-lg" /> */}

      {/* Post something... */}
      <div className="w-full mb-4 rounded-lg">{postDescription}</div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <div className="flex items-center">
          <button
            onClick={() => {
              // onHeartClick(postId);\
              onHeartClick();
            }}
            className={cn(isLiked ? "text-indigo-600" : "text-gray-500")}
          >
            <Heart />
          </button>
          <p className={cn(isLiked ? "text-indigo-600" : "text-gray-500")}>
            {likeCount}
          </p>
        </div>
        <div className="flex items-start">
          <button
            onClick={onCommentClick}
            className="text-gray-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 10a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2h3l3 3 3-3h4a2 2 0 002-2v-7z"
              />
            </svg>
          </button>
          <p className="text-gray-600">{commentCount}</p>
        </div>
        <div className="flex items-center">
          <button
            onClick={onShareClick}
            className="text-gray-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
          <p className="text-gray-600">{shareCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

// "w-full py-2 border-[2px] border-indigo-600 rounded-lg text-indigo-600 hover:bg-indigo-600 hover:text-white"
// absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-3/4 md:w-1/2 lg:w-1/4 p-4 border-[2px] border-indigo-600 rounded-lg
