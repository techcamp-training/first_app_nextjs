"use client"

import React, { useRef } from "react";


export const Form: React.FC = () => {
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