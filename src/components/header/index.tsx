import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  openMenu
} from "../../redux/actions";

function Header() {
  const dispatch = useDispatch();
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header__icon} onClick={() => dispatch(openMenu())}>
          <Image
            src="/img/headerIcon/menu.png"
            alt="menu icon"
            loading="eager"
            width={35}
            height={35}
            priority
          />
        </div>
        <h1 style={{ letterSpacing: "1px", textAlign: "left" }}>
          <Link href="/">
            <a>
              <span style={{ fontWeight: 250 }}>Simple</span>
              <span style={{ fontWeight: 100 }}>News</span>
            </a>
          </Link>
        </h1>
      </header>
    </section>
  );
}

export default Header;
