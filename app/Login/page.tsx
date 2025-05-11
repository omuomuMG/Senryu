"use client";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import styles from "./Login.module.css";
import Header from "../Header/header";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const GoogleProvider = new GoogleAuthProvider();
  const GitHubProvider = new GithubAuthProvider();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, GoogleProvider);
  };

  const signInWithGitHub = async () => {
    await signInWithPopup(auth, GitHubProvider);
  };

  const [lognined] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("uid", JSON.stringify(auth.currentUser?.uid));
  }, [auth.currentUser?.uid]);

  const redirect = () => {
    toast.loading("リダイレクトします", {
      duration: 3000,
    });
    toast.success("成功しました", {
      duration: 3000,
    });

    router.push("/");
    router.refresh();
  };

  return (
    <div>
      <Header />
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

              <button className={styles.loginButton} onClick={signInWithGitHub}>
                <span className={styles.buttonText}>GitHubでログイン</span>
              </button>
            </div>

            <div className={styles.statusContainer}>
              {lognined ? (
                <>
                  <p className={styles.statusText}>ログイン済み</p>
                  {redirect()}
                </>
              ) : (
                <p className={styles.statusText}>ログインしてください！</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
