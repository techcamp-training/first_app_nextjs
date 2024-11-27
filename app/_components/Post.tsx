"use client"

import React, { useState, useRef} from "react";
import { ResponsePost } from "@/app/_type/ResponsePost";
import Link from "next/link";

interface PostProps {
  post: ResponsePost;
  updatePost: (updatedPost: ResponsePost) => void;
  deletedPost: (deletedPost: ResponsePost) => void;
}

export const Post: React.FC<PostProps> = ({post, updatePost, deletedPost}) => {
  const [isEditing, setIsEditing] = useState(false);
  const content = useRef<HTMLInputElement>(null);
  const [editContent, setEditContent] = useState(post.content);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const contentValue = content.current?.value;
    
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({content: contentValue})
      });

      const data = await response.json();
      updatePost(data.post);
      setIsEditing(false);

    } catch(error) {
      console.log("APIリクエストエラー", error);
      throw new Error("更新に失敗しました");
    }
  }

  const handleDelete = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
      })

      const data = await response.json();
      deletedPost(data.post);

    } catch (error) {{{
      console.log("APIリクエストエラー", error);
      throw new Error("削除に失敗しました");
    }}} 
  }
  
  // 日付変換表のメソッド
  const changeFormat = (date: string) => {
    return new Date(date).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  }

  return(
    <li className="post">
      {isEditing ? (
        <>
          <input type="text" name="content" ref={content} defaultValue={editContent}/>
          <button onClick={handleUpdate}>更新</button>
        </>
      ) : (
        <>
          <Link href={`/posts/${post.id}`}>
            <p>{post.content}</p>
          </Link>
          <button onClick={() => setIsEditing(true)}>編集</button>

        </>
      )}
      {/* {isEditing ? (
        // <button onClick={handleUpdate}>更新</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>編集</button>
      )} */}
      <button onClick={handleDelete}>削除</button>
      {/* <Link href={`/posts/${post.id}`}>詳細</Link> */}
  </li>
  )
}