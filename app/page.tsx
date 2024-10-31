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
//川柳のSNS

const Yuji_Syuku_Font = Klee_One({
  weight: "400",
  subsets: ["latin"],
});

type ContentState = {
  id: string;
  title: string;
  body: string;
  rating: number;
  firstPart: string | undefined;
  midlePart: string | undefined;
  lastPart: string | undefined;
  getContent: (content: Content) => void;
};

export const useStore = create<ContentState>((set) => ({
  id: "",
  title: "",
  body: "",
  rating: 0,
  firstPart: "",
  midlePart: "",
  lastPart: "",
  getContent: (content: Content) =>
    set({
      id: content.id,
      title: content.title,
      body: content.body,
      rating: content.rating,
      firstPart: content.firstPart,
      midlePart: content.midlePart,
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
        <Link href={{ pathname: "/PostContent" }}>日記を書く</Link>
        <div className={Yuji_Syuku_Font.className}>
          <h1 className={styles.contentTitle}>Content</h1>
          <div className={styles.contents}>
            {contents.map((content) => (
              <div key={content.id} className={styles.content}>
                <p className={styles.firstPart}>{content.firstPart}</p>
                <p className={styles.midlePart}>{content.midlePart}</p>
                <p className={styles.lastPart}>{content.lastPart}</p>
                <Link href={"/EditContent"}>
                  <button onClick={() => getContent(content)}>編</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
