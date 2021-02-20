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

  const sortBy = "popularity"
  const pageSize = 5;

  // OpenWeatherMapの天気の情報を取得
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=35.4122&lon=139.4130&units=metric&exclude=hourly,minutely&appid=${process.env.WEATHER_API_KEY}`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  // NewsAPIのトップ記事の情報を取得
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  // NewsAPIのコロナウイルス記事の情報を取得
  const covidKeyword = "covid-19"
  const covidRes = await fetch(
    `https://newsapi.org/v2/everything?q=${covidKeyword}&language=jp&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`
  );
  const covidJson = await covidRes.json();
  const covidArticles = covidJson?.articles;

  // NewsAPIのピックアップ記事の情報を取得
  const pickupKeyword = "software";
  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=${pickupKeyword}&language=jp&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`
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
    revalidate: 60 * 10,
  };
};
