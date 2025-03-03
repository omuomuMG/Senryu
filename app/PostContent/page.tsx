"use client";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../Firebase";
import styles from "./PostContent.module.css";
import Link from "next/link";

export default function PostContent() {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const firstPartRef = useRef<HTMLTextAreaElement | null>(null);
  const midlePartRef = useRef<HTMLTextAreaElement | null>(null);
  const lastPartRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("川柳を詠んでいます...", {
      duration: 3000,
    });
    const newContent: Content = {
      body: "aaa",
      title: "aaa",
      id: Math.random().toString(32).substring(2),
      firstPart: firstPartRef?.current?.value,
      middlePart: midlePartRef?.current?.value,
      lastPart: lastPartRef?.current?.value,
    };
    const uid = JSON.parse(localStorage.getItem("uid") || '""');
    await setDoc(
      doc(db, "all", uid, "poem1", newContent?.id as string),
      newContent
    );
    toast.success("川柳を投稿しました！", {
      duration: 3000,
    });

    router.push("/");
    router.refresh();
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.formContainer}>
        <Link href="/" className={styles.backLink}>
          ← 戻る
        </Link>
        <h1 className={styles.title}>川柳を詠む</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>上の句</label>
            <textarea
              ref={firstPartRef}
              placeholder="五音"
              className={styles.textarea}
              maxLength={20}
            ></textarea>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>中の句</label>
            <textarea
              ref={midlePartRef}
              placeholder="七音"
              className={styles.textarea}
              maxLength={20}
            ></textarea>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>下の句</label>
            <textarea
              ref={lastPartRef}
              placeholder="五音"
              className={styles.textarea}
              maxLength={20}
            ></textarea>
          </div>

          <button type="submit" className={styles.submitButton}>
            投稿する
          </button>
        </form>
      </div>
    </div>
  );
}
