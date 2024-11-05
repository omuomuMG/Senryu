"use client";
import { doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../Firebase";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "@/app/page";
import { useRouter } from "next/navigation";

export default function EditContent() {
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  const firstPartRef = useRef<HTMLTextAreaElement | null>(null);
  const middlePartRef = useRef<HTMLTextAreaElement | null>(null);
  const lastPartRef = useRef<HTMLTextAreaElement | null>(null);

  const router = useRouter();

  const { id, title, body, firstPart, middlePart, lastPart } = useStore(
    (state) => ({
      id: state.id,
      title: state.title,
      body: state.body,
      firstPart: state.firstPart,
      middlePart: state.midlePart,
      lastPart: state.lastPart,
    })
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("本を書き換え中", {
      duration: 3000,
    });
    const newContent: Content = {
      body: bodyRef?.current?.value || "", // Default to empty string if undefined
      id: id,
      title: titleRef?.current?.value || "",
      firstPart: firstPartRef?.current?.value || "",
      middlePart: middlePartRef?.current?.value || "", // Corrected typo here
      lastPart: lastPartRef?.current?.value || "",
    };

    const uid = JSON.parse(localStorage.getItem("uid") || '""');
    await updateDoc(
      doc(db, "all", uid, "poem1", newContent?.id as string),
      newContent
    );
    toast.success("詩を書き換えました", {
      duration: 3000,
    });
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <div>
        <h1>{id}</h1>
        <h1>{body}</h1>
        <h1>{firstPart}</h1>
        <Toaster />
        <h1>詩を記録</h1>
        <form onSubmit={handleSubmit}>
          <label>
            上:
            <textarea
              ref={firstPartRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            >
              {firstPart}
            </textarea>
            中:
            <textarea
              ref={middlePartRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            >
              {middlePart}
            </textarea>
            下:
            <textarea
              ref={lastPartRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            >
              {lastPart}
            </textarea>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
