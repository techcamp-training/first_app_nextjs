"use client"

import React, { useRef } from "react";
import { Post } from "@/app/_type/Post";

interface FormProps {
  addPost: (newPost: Post) => void;
}

export const Form: React.FC<FormProps> = ({ addPost }) => {
  const content = useRef<HTMLInputElement>(null);

  const handleClick = async (e: any) => {
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

      const data = await response.json();
      addPost(data.post);

      // responseがOKで返却されている、かつ入力フォームに値があればリセット。
      if(response.ok && contentValue) {
        content.current.value = "";
      }
      

    } catch(error) {
      console.log("APIリクエストエラー", error);
      throw new Error("投稿に失敗しました");
    }
    
  }

  return(
    <form>
      <input type="text" name="content" ref={content}/>
      <button type="submit" onClick={handleClick}>投稿する</button>
    </form>
  )
}