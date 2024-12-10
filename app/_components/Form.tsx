"use client"

import React, { useRef, useState } from "react";
import { ResponsePost } from "@/app/_type/ResponsePost";

interface FormProps {
  addPost: (newPost: ResponsePost) => void;
}

export const Form: React.FC<FormProps> = ({ addPost }) => {
  const content = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contentValue = content.current?.value
    
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({content: contentValue})
      });

      if (!response.ok) {
        throw new Error("投稿に失敗しました");
      }

      const data = await response.json();
      addPost(data.post);

      // responseがOKで返却されている、かつ入力フォームに値があればリセット。
       content.current && (content.current.value = "");
        
    } catch(error) {
      console.log("APIリクエストエラー", error);
      setError("投稿に失敗しました")
    } 
  }

  return(
    <>
      {error && <div className="error-message">{error}</div>}
      <form className="form">
        <input
          id="content" 
          type="text"
          name="update-content"
          ref={content}
          className="input-form"
          data-testid="content" 
        />
        <button 
          type="submit"
          onClick={handleClick}
          className="submit-btn"
          >
          投稿する
        </button>
      </form>
    </>
  )
}