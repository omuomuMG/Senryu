"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
  getContent: (content: Content) => void;
};

export const useStore = create<ContentState>((set) => ({
  id: "",
  title: "",
  body: "",
  rating: 0,
  getContent: (content: Content) =>
    set({
      id: content.id,
      title: content.title,
      body: content.body,
      rating: content.rating,
    }),
}));

export default function Home() {
  const [contents, setContents] = useState<Content[]>([]);

  const [user] = useAuthState(auth);

  useEffect(() => {
    fetchContents();
    console.log(user);
  }, []);

  const fetchContents = async () => {
    try {
      const contentsCollectionRef = collection(db, "user1");
      const querySnapShot = await getDocs(contentsCollectionRef);
      const contentsData: Content[] = [];
      querySnapShot.forEach((doc) => {
        contentsData.push({ id: doc.id, ...doc.data() } as Content);
      });
      setContents(contentsData);
    } catch (e) {
      console.log("Error fetching contents", e);
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
                <h2>{content.title}</h2>
                <p>{content.body}</p>
                <p>{content.rating}</p>
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
