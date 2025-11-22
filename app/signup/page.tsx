"use client";

import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signup.module.scss";

export default function SignupPage() {
  const { signup, error, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    const result = await signup(email, password, name);

    if (result.success) {
      router.push("/");
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Join Tea Shop</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              minLength={8}
              disabled={isSubmitting}
            />
            <small>Must be at least 8 characters long</small>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" disabled={isSubmitting || loading} className={styles.button}>
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
