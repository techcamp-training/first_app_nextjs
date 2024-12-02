"use client"

import { Form } from "./_components/Form"
import React, { useEffect, useState } from "react";
import { ResponsePost } from "@/app/_type/ResponsePost";
import { Post } from "./_components/Post";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<ResponsePost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 一覧表示データの更新
  const addPost = (newPost: ResponsePost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  }

  const updatePost = (updatedPost: ResponsePost) => {
    // setPostsが実行された時点でのpostsのデータがprevPostsに格納される
    setPosts((prevPosts) => 
      prevPosts.map(post => post.id === updatedPost.id ? updatedPost : post)
    );
  }

  const deletePost = (deletedPost: ResponsePost) => {
    setPosts((prevPosts) => 
      prevPosts.filter(post => post.id !== deletedPost.id)
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
        setIsLoading(false)
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
        {isLoading ? (
          <p>読み込み中...</p>
        ) : (
          <ul>
            {posts.map((post) => {
              return(
                <Post 
                  key={post.id}
                  post={post}
                  updatePost={updatePost}
                  deletedPost={deletePost}
                />
              )
            })}
          </ul>
        )}
      </div>
    </>
  );
}
export default Home;