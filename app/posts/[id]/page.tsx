"use client"

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { ResponsePost } from "@/app/_type/ResponsePost";

const ShowPage: React.FC = () => {

  const params = useParams();
  const [post, setPost] = useState<ResponsePost | null>(null);

  useEffect(()=> {
    const fetchPost = async() => {
      try {
        const response = await fetch(`/api/posts/${params.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { post } = await response.json();
        setPost(post)
      } catch(error) {
        console.log("APIリクエストエラー", error);
        throw new Error("投稿の取得ができませんでした");
      }
    }
    fetchPost();
  },[post])

  if (!post) return ;

  return(
    <>
      <h2>詳細ページ</h2>
      <p>内容：{post.content}</p>
      <p>投稿日：{post.createdAt}</p>
    </>
  )
}

export default ShowPage;