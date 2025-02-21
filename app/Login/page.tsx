"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import styles from "./Login.module.css";
import Header from "../Header/header";

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
    <main className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h2 className={styles.title}>ログイン</h2>
          <div className={styles.decorativeLine}></div>

          <p className={styles.description}>
            アカウントを選択してログインしてください
          </p>

          <div className={styles.buttonContainer}>
            <button className={styles.loginButton} onClick={signInWithGoogle}>
              <span className={styles.buttonText}>Googleでログイン</span>
            </button>

            <button className={styles.loginButton}>
              <span className={styles.buttonText}>GitHubでログイン</span>
            </button>
          </div>

          <div className={styles.statusContainer}>
            {lognined ? (
              <p className={styles.statusText}>ログイン済み</p>
            ) : (
              <p className={styles.statusText}>ログインしてください！</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
