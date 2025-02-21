import Link from "next/link";
import React from "react";
import styles from "./header.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";

const Header = () => {
  const [lognined] = useAuthState(auth);
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.titleLink}>
          <h1 className={styles.title}>毎日川柳</h1>
        </Link>
        <div className={styles.loginContainer}>
          {lognined ? (
            <Link href="/Logout" className={styles.loginLink}>
              ログアウト
            </Link>
          ) : (
            <Link href="/Login" className={styles.loginLink}>
              ログイン
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
