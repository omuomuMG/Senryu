"use client";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { create } from "zustand";
import { auth, db } from "./Firebase";
import styles from "./page.module.css";
import Header from "./Header/header";
import { Klee_One } from "next/font/google";
import { MaterialSymbolsEditSquare } from "./Icons/edit";
import { MaterialSymbolsDelete } from "./Icons/delete";

const Yuji_Syuku_Font = Klee_One({
  weight: "400",
  subsets: ["latin"],
});

type ContentState = {
  id: string;
  title: string;
  body: string;
  firstPart: string | undefined;
  middlePart: string | undefined;
  lastPart: string | undefined;
  getContent: (content: Content) => void;
};

export const useStore = create<ContentState>((set) => ({
  id: "",
  title: "",
  body: "",
  rating: 0,
  firstPart: "",
  middlePart: "",
  lastPart: "",
  getContent: (content: Content) =>
    set({
      id: content.id,
      title: content.title,
      body: content.body,
      firstPart: content.firstPart,
      middlePart: content.middlePart,
      lastPart: content.lastPart,
    }),
}));

export default function Home() {
  const [contents, setContents] = useState<Content[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<Content | null>(null);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const uid = JSON.parse(localStorage.getItem("uid") || '""');
      if (uid) {
        console.log(uid);
        const userCollectionRef = collection(db, "all", uid, "poem1");

        const poemSnapShot = await getDocs(userCollectionRef);

        const contentsData: Content[] = [];

        poemSnapShot.forEach((doc) => {
          contentsData.push({ id: doc.id, ...doc.data() } as Content);
        });

        setContents(contentsData);
      } else {
        console.log("erorr:" + uid);
      }
    } catch (e) {
      console.log("Error fetching user poems", e);
    }
  };

  const getContent = useStore((state) => state.getContent);

  const handleDeleteClick = (content: Content) => {
    setContentToDelete(content);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (contentToDelete) {
      try {
        const uid = JSON.parse(localStorage.getItem("uid") || '""');
        await deleteDoc(doc(db, "all", uid, "poem1", contentToDelete.id));
        setShowDeleteModal(false);
        setContentToDelete(null);
        // 画面をリフレッシュ
        fetchContents();
      } catch (error) {
        console.error("Error deleting content:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setContentToDelete(null);
  };

  return (
    <>
      <div>
        <Header />
        <Link href="/PostContent" className={styles.createButton}>
          <span className={styles.createButtonIcon}>✎</span>
          <span className={styles.createButtonText}>川柳を書く</span>
        </Link>
        <div className={Yuji_Syuku_Font.className}>
          <h1 className={styles.contentTitle}>Content</h1>
          <div className={styles.contents}>
            {contents.map((content) => (
              <div key={content.id} className={styles.content}>
                <div className={styles.poemContent}>
                  <p className={styles.firstPart}>{content.firstPart}</p>
                  <p className={styles.middlePart}>{content.middlePart}</p>
                  <p className={styles.lastPart}>{content.lastPart}</p>
                </div>
                <div className={styles.buttonGroup}>
                  <Link href="/EditContent" className={styles.actionLink}>
                    <button
                      className={styles.actionButton}
                      onClick={() => getContent(content)}
                    >
                      <MaterialSymbolsEditSquare />
                    </button>
                  </Link>
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleDeleteClick(content)}
                  >
                    <MaterialSymbolsDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showDeleteModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>削除の確認</h2>
              <p className={styles.modalText}>
                この川柳を削除してもよろしいですか？
              </p>
              <div className={styles.modalButtons}>
                <button
                  className={`${styles.modalButton} ${styles.cancelButton}`}
                  onClick={handleDeleteCancel}
                >
                  キャンセル
                </button>
                <button
                  className={`${styles.modalButton} ${styles.confirmButton}`}
                  onClick={handleDeleteConfirm}
                >
                  削除する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// async function deleteContent(content: Content) {
//   const uid = JSON.parse(localStorage.getItem("uid") || '""');
//   await deleteDoc(doc(db, "all", uid, "poem1", content.id));
// }
