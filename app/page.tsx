"use client"

import { Form } from "./_components/Form"
import React, { useEffect, useState } from "react";
import { ResponsePost } from "@/app/_type/ResponsePost";
import { Post } from "./_components/Post";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<ResponsePost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

        // ステータスが200以外の場合はエラーとして処理
        if (!response.ok) {
          throw new Error("投稿の取得に失敗しました");
        }

        const { posts }: { posts: ResponsePost[] }= await response.json();
        setPosts(posts)
      } catch (error){
        console.log("APIリクエストエラー", error);
        setError("投稿の取得ができませんでした");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  },[]);

  return (
    <>
      <h2>トップページ</h2>
      <Form addPost={addPost}/>
      <div>
        {isLoading ? ( <p>読み込み中...</p>) : error ? (<p>投稿を取得できませんでした</p>) : 
        (
          <ul>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Post 
                  key={post.id}
                  post={post}
                  updatePost={updatePost}
                  deletedPost={deletePost}
                />
              ))
            ) : (
              <p>投稿がありません</p>
            )}
          </ul>
        )}
      </div>
    </>
  );
}
export default Home;