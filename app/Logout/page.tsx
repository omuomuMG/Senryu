"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { useEffect } from "react";
import styles from "./SignOut.module.css";
import Header from "../Header/header";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.loading("リダイレクトします", { duration: 3000 });
      toast.success("成功しました", { duration: 3000 });
      router.push("/");
      router.refresh();
    }
  }, [user, router]);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <button className={styles.signOutButton} onClick={() => auth.signOut()}>
          <span className={styles.buttonText}>ログアウトする</span>
        </button>
        <div className={styles.statusContainer}></div>
      </div>
    </div>
  );
}
