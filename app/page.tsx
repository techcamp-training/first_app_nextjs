// import styles from "./page.module.css";
"use client"

import { Form } from "@/app/_components/Form"
import React, { useEffect, useState, useRef } from "react";
import { ResponsePost } from "@/app/_type/ResponsePost";
import { Post } from "@/app/_components/Post";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<ResponsePost[]>([]);

  // 一覧表示データの更新
  const addPost = (newPost: ResponsePost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  }

  const updatePost = (updatedPost: ResponsePost) => {
    setPosts((prevPosts) => 
      prevPosts.map(post => post.id === updatedPost.id ? updatedPost : post)
    );
  }

  useEffect(()=> {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { posts }: { posts: ResponsePost[] }= await response.json();
        setPosts(posts)

      } catch (error){
        console.log("APIリクエストエラー", error);
        throw new Error("投稿の取得ができませんでした");
      }
    };
    fetchPosts();
  },[]);


  return (
    <>
      <h2>トップページ</h2>
      <Form addPost={addPost}/>
      <div>
        <ul>
          {posts.map((post) => {
            return(
              <Post key={post.id} post={post} updatePost={updatePost} />
            )
          })}
        </ul>
      </div>
    </>
  );
}
export default Home;