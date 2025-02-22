"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { useEffect } from "react";
import styles from "./SignOut.module.css";
import Link from "next/link";
import Header from "../Header/header";

export default function SignOut() {
  const [user] = useAuthState(auth);
  return (
    <div>
      <Header />
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
    </div>
  );
}
