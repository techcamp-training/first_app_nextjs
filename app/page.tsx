// import styles from "./page.module.css";
"use client"

import { Form } from "@/app/_components/Form"
import React, { useEffect, useState } from "react";
import { Post } from "@/app/_type/Post";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // 日付変換表のメソッド
  const changeFormat = (date: string) => {
    return new Date(date).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",
      day: "2-digit"})
  }

  // 一覧表示データの更新
  const addPost = (newPost: Post) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  }
  
  useEffect(()=> {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { posts }: { posts: Post[] }= await response.json();
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
              <li key={post.id} className="post">
                <p>{post.content}</p>
                <p className="post-date">{changeFormat(post.createdAt)}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
}
export default Home;