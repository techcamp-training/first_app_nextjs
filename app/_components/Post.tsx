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
  const [error, setError] = useState<string | null>(null); 
  const [editContent, setEditContent] = useState(post.content);

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

      if(!response.ok) {
        throw new Error("更新に失敗しました");
      }

      const data = await response.json();
      updatePost(data.post);
      setEditContent(data.post.content);
    } catch(error) {
      console.log("APIリクエストエラー", error);
      setError("更新に失敗しました")
    } finally {
      setIsEditing(false);
    }
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
      })

      if(!response.ok) {
        throw new Error("削除に失敗しました");
      }

      const data = await response.json();
      deletedPost(data.post);

    } catch (error) {{{
      console.log("APIリクエストエラー", error);
      setError("削除に失敗しました")
    }}} 
  }
  
  return(
    <li className="post">
      {error && <div className="error-message">{error}</div>}
      {isEditing ? (
        <>
          <div className="form">
            <input 
              type="text"
              name="content"
              ref={content}
              defaultValue={editContent}
              className="input-form"
            />
            <button className="btn" onClick={handleUpdate}>更新</button>
          </div>
        </>
      ) : (
        <>
          <Link href={`/posts/${post.id}`}>
            <p>{post.content}</p>
          </Link>
          <div className="btn-list">
            <button className="btn" onClick={() => setIsEditing(true)}>編集</button>
            <button className="btn" onClick={handleDelete}>削除</button>
          </div>
        </>
      )}
  </li>
  )
}