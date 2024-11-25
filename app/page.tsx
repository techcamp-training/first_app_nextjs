// import styles from "./page.module.css";
"use client"

import { Form } from "@/app/_components/Form"
import React, { useEffect, useState } from "react";

interface Post {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
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
      <Form />
      <div>
        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <p>{post.content}</p>
                <p>{post.createdAt.toString()}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
}
export default Home;