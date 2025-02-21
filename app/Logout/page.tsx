"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { useEffect } from "react";
import styles from "./SignOut.module.css";
import Link from "next/link";

export default function SignOut() {
  const [user] = useAuthState(auth);

  return (
    <div className={styles.container}>
      <button className={styles.signOutButton} onClick={() => auth.signOut()}>
        <span className={styles.buttonText}>ログアウトされました</span>
      </button>
      <div className={styles.statusContainer}>
        {user ? (
          <p className={styles.statusText}>ログイン中</p>
        ) : (
          <Link href={{ pathname: "/" }}>ホームへ戻る</Link>
        )}
      </div>
    </div>
  );
}
