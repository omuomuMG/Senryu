"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  const GoogleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, GoogleProvider);
  };

  const [lognined] = useAuthState(auth);

  useEffect(() => {
    localStorage.setItem("uid", JSON.stringify(auth.currentUser?.uid));
    console.log(localStorage.getItem("uid"));
  }, [auth.currentUser?.uid]);

  return (
    <main className="h-screen bg-yellow-300 pt-10">
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-md py-12">
          <p className="mb-5 text-center">
            好きなアカウントでのログインを行なってください
          </p>
          <div className="flex gap-3 flex-col items-center">
            <button
              className="bg-white w-max border border-black py-2 px-4 rounded"
              onClick={signInWithGoogle}
            >
              Googleでログイン
            </button>
            <button className="bg-black text-white w-max border border-black py-2 px-4 rounded">
              GitHubでログイン
            </button>
          </div>
          <div>{lognined ? <p>ろぐいんんずむ</p> : <p>ずむくない</p>}</div>
        </div>
      </div>
    </main>
  );
}
