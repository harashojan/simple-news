import React from "react";
import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { openMenu } from "../../redux/actions";

const TOPICS = [
  {
    icon: "01",
    path: "/",
    title: "Top stories",
  },
  {
    icon: "03",
    path: "/topics/business",
    title: "Business",
  },
  {
    icon: "04",
    path: "/topics/technology",
    title: "Technology",
  },
  {
    icon: "05",
    path: "/topics/entertainment",
    title: "Entertainment",
  },
  {
    icon: "06",
    path: "/topics/sports",
    title: "Sports",
  },
];

const Nav: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <section className={styles.container}>
      <ul className={styles.contents}>
        {TOPICS.map((topic, index) => {
          return (
            <li key={index} onClick={() => dispatch(openMenu())}>
              <Link href={`${topic.path}`}>
                <a>
                  <span>
                    <Image
                      src={`/img/navIcons/${topic.icon}.png`}
                      alt={`${topic.title} icon`}
                      loading="eager"
                      width={33}
                      height={33}
                      priority
                    />
                  </span>
                  <span>{topic.title}</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Nav;
