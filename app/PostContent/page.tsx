"use client";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../Firebase";

export default function PostContent() {
  const titleRef = useRef<HTMLInputElement | null>(null);

  const firstPartRef = useRef<HTMLTextAreaElement | null>(null);
  const midlePartRef = useRef<HTMLTextAreaElement | null>(null);
  const lastPartRef = useRef<HTMLTextAreaElement | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("詩を記録中", {
      duration: 3000,
    });
    const newContent: Content = {
      body: "aaa",
      title: "aaa", //消してもいいかも
      id: Math.random().toString(32).substring(2),
      firstPart: firstPartRef?.current?.value,
      midlePart: midlePartRef?.current?.value,
      lastPart: lastPartRef?.current?.value,
    };
    const uid = JSON.parse(localStorage.getItem("uid") || '""');
    await setDoc(
      doc(db, "all", uid, "poem1", newContent?.id as string),
      newContent
    );
    toast.success("本棚に収納しました！", {
      duration: 3000,
    });

    router.push("/");
    router.refresh();
  };
  return (
    <>
      <div>
        <Toaster />
        <h1>詩を記録</h1>
        <form onSubmit={handleSubmit}>
          <label>
            上:
            <textarea
              ref={firstPartRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            中:
            <textarea
              ref={midlePartRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            下:
            <textarea
              ref={lastPartRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
