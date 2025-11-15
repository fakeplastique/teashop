import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🍵</span>
          Tea Shop
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tea-rules">Tea Rules</Link>
          </li>
          <li>
            <Link href="/quiz">Quiz</Link>
          </li>
          <li>
            <Link href="/favorites">Favorites</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
