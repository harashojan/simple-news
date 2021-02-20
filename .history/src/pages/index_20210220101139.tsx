import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Article, Nav, PickupArticle, WeatherNews } from "../components/index";
import MainLayout from "../layouts/main";
import styles from "../styles/Home.module.scss";

export default function Home(props) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const articleList = [
    { title: "headlines", articles: props.topArticles },
    { title: "covid-19", articles: props.covidArticles },
  ];

  const isOpen = useSelector((state) => state.menu);
  let style;
  if (isOpen) {
    style = { display: "flex", zIndex: 3 };
  }
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav} style={style}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main}>
          {articleList.map((article, index) => {
            return (
              <Article
                key={index}
                title={article.title}
                articles={article.articles}
              />
            );
          })}
        </div>
        <div className={styles.aside}>
          <WeatherNews weatherNews={props.weatherNews} />
          <PickupArticle articles={props.pickupArticles} />
        </div>
      </div>
    </MainLayout>
  );
}

export const getStaticProps = async () => {
  // OpenWeatherMapの天気の情報を取得
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=35.4122&lon=139.4130&units=metric&exclude=hourly,minutely&appid=9b8962e92bfba5b1dc4eaa368acdf666`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  // NewsAPIのトップ記事の情報を取得
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=10&apiKey=a8bdc169bdcd495a8e0857f012c974e0`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  // NewsAPIのコロナウイルス記事の情報を取得
  const covidRes = await fetch(
    `https://newsapi.org/v2/everything?q=covid-19&language=jp&sortBy=popularity&pageSize=5&apiKey=${}`
  );
  const covidJson = await covidRes.json();
  const covidArticles = covidJson?.articles;

  // NewsAPIのピックアップ記事の情報を取得
  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=software&language=jp&sortBy=popularity&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
  );
  const pickupJson = await pickupRes.json();
  const pickupArticles = pickupJson?.articles;

  return {
    props: {
      weatherNews,
      topArticles,
      covidArticles,
      pickupArticles,
    },
    revalidate: 60,
  };
};
