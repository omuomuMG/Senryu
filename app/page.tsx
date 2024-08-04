"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { create } from "zustand";
import { auth, db } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login/page";

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
        <Login></Login>
        <Link href={{ pathname: "/PostContent" }}>a</Link>
        <h1>Content</h1>
        {contents.map((content) => (
          <div key={content.id}>
            <h2>{content.title}</h2>
            <p>{content.body}</p>
            <p>{content.rating}</p>
            <Link href={"/EditContent"}>
              <button onClick={() => getContent(content)}>Edit</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
