import React from "react";
import SideBar1 from "../_components/feed2/SideBar1";
import PostBar from "../_components/feed2/PostBar";
import SideBar2 from "../_components/feed2/SideBar2";

function Feed2() {
  return (
    <div className="flex items-center h-full">
      <SideBar1 />
      <PostBar />
      <SideBar2 />
    </div>
  );
}

export default Feed2;
