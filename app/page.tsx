"use client";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { create } from "zustand";
import { auth, db } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./page.module.css";
import Header from "./Header/header";
import { Klee_One } from "next/font/google";
import { MaterialSymbolsEditSquare } from "./Icons/edit";

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

  return (
    <>
      <div>
        <Header />
        <Link href={{ pathname: "/PostContent" }}>川柳を書く</Link>
        <div className={Yuji_Syuku_Font.className}>
          <h1 className={styles.contentTitle}>Content</h1>
          <div className={styles.contents}>
            {contents.map((content) => (
              <div key={content.id} className={styles.content}>
                <p className={styles.firstPart}>{content.firstPart}</p>
                <p className={styles.middlePart}>{content.middlePart}</p>
                <p className={styles.lastPart}>{content.lastPart}</p>
                <Link href={"/EditContent"}>
                  <button
                    className={styles.editButton}
                    onClick={() => getContent(content)}
                  >
                    <MaterialSymbolsEditSquare />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
