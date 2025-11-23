"use client";

import { useAuth } from "@/lib/auth";
import Link from "next/link";
import styles from "./AuthNav.module.scss";

export default function AuthNav() {
  const { user, isAuthenticated, logout, loading } = useAuth();

  if (loading) {
    return <div className={styles.loading}>...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div className={styles.authNav}>
        <span className={styles.username}>
          {user.name || user.email}
        </span>
        <button onClick={logout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className={styles.authNav}>
      <Link href="/login" className={styles.link}>
        Login
      </Link>
      <Link href="/signup" className={styles.link}>
        Sign Up
      </Link>
    </div>
  );
}
