import type { LayoutProps } from "../types";
import {Header} from "../../components/index";
import styles from "./index.module.scss";

function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
}

export default MainLayout;
