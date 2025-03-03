"use client";
import { doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../Firebase";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "@/app/page";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./EditContent.module.css";

export default function EditContent() {
  const firstPartRef = useRef<HTMLTextAreaElement | null>(null);
  const middlePartRef = useRef<HTMLTextAreaElement | null>(null);
  const lastPartRef = useRef<HTMLTextAreaElement | null>(null);

  const router = useRouter();

  const { id, firstPart, middlePart, lastPart } = useStore((state) => ({
    id: state.id,
    firstPart: state.firstPart,
    middlePart: state.middlePart,
    lastPart: state.lastPart,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("川柳を編集中...", {
      duration: 3000,
    });
    const newContent: Content = {
      body: "aaa",
      id: id,
      title: "aaa",
      firstPart: firstPartRef?.current?.value || "",
      middlePart: middlePartRef?.current?.value || "",
      lastPart: lastPartRef?.current?.value || "",
    };

    const uid = JSON.parse(localStorage.getItem("uid") || '""');
    await updateDoc(
      doc(db, "all", uid, "poem1", newContent?.id as string),
      newContent
    );
    toast.success("川柳を更新しました", {
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
        <h1 className={styles.title}>川柳を編集</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>上の句</label>
            <textarea
              ref={firstPartRef}
              defaultValue={firstPart}
              className={styles.textarea}
              maxLength={20}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>中の句</label>
            <textarea
              ref={middlePartRef}
              defaultValue={middlePart}
              className={styles.textarea}
              maxLength={20}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>下の句</label>
            <textarea
              ref={lastPartRef}
              defaultValue={lastPart}
              className={styles.textarea}
              maxLength={20}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              更新する
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className={styles.cancelButton}
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
