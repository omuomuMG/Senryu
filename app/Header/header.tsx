import Link from "next/link";
import React from "react";

import styles from "./header.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";

const Header = () => {
  const [lognined] = useAuthState(auth);
  return (
    <header className={styles.header}>
      <h1>毎日川柳</h1>
      <div className={styles.login}>
        {lognined ? (
          <Link href={{ pathname: "/Logout" }}>ログアウト</Link>
        ) : (
          <Link href={{ pathname: "/Login" }}>ログイン</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
