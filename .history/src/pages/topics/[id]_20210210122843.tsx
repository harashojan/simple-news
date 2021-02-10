import Head from "next/head";
import fetch from "node-fetch";
import { useRouter } from "next/router";
import {
  Article,
  Nav,
  PickupArticle,
  WeatherNews,
} from "../../components/index";
import MainLayout from "../../layouts/main/index";
import { useSelector } from "react-redux";
import styles from "../../styles/Home.module.scss";

function Topic(props) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const isOpen = useSelector((state) => state.menu);
  let style;
  if (isOpen) {
    style = { display: "flex", zIndex: 3 };
  }
  return (
    <MainLayout>
      <Head>
        <title>Simple News - {props.title.toUpperCase()}</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav} style={style}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <main className={styles.main} style={{marginRight: "10%"}}>
          <Article title={props.title} articles={props.topicArticles} />
        </main>
      </div>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=35.4122&lon=139.4130&units=metric&exclude=hourly,minutely&appid=9b8962e92bfba5b1dc4eaa368acdf666`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=software&language=jp&sortBy=popularity&pageSize=5&apiKey=a8bdc169bdcd495a8e0857f012c974e0`
  );
  const pickupJson = await pickupRes.json();
  const pickupArticles = pickupJson?.articles;

  const topicRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&category=${params.id}&country=jp&apiKey=a8bdc169bdcd495a8e0857f012c974e0`
  );
  const topicJson = await topicRes.json();
  const topicArticles = await topicJson.articles;

  const title = params.id;

  return {
    props: { weatherNews, pickupArticles, topicArticles, title },
    revalidate: 60 * 60,
  };
}

export default Topic;
