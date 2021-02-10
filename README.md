# Google News のクローンアプリです。

```console
$ yarn add redux react-redux redux-devtools-extension redux-thunk sass moment
```

```
$yarn add -D @types/node @types/react typescript
```

# プログラミング
## プログラミング
### プログラミング
#### プログラミング

```
programming
```

> programming

`hello world`
"hello"
'helloo'
@helo
$hello
%hello

* hello
* world

. hello
. hello

- hello
 - world


```js:hello.js
const helloApi = () => {
 console.log("hello world")
}
```

[yahoo](https://yahoo.co.jp)
[yahoo]:https://yahoo.co.jp

[ヤフー][yahoo]

hello
world

好きな言語は`JavaScript`です。

>引用：Wikipedia

~~訂正~~
**太文字**

_斜体_
__太文字__
___斜体太文字___

---
___
***

sita


名前 | 悠太
-|-


```src/index.tsx
import Head from "next/head";
import { Article, Nav, PickupArticle, WeatherNews } from "../components/index";
import MainLayout from "../layouts/main";
import styles from "../styles/Home.module.scss";

export default function Home(props) {

  const articleList = [
    { title: "headlines", articles: props.topArticles },
    { title: "covid-19", articles: props.covidArticles },
  ];

  return (
    <MainLayout>
      <Head>
        <title>Google News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav} >
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main}>
          {articleList.map((articleItem, index) => {
            return (
              <Article
                key={index}
                title={articleItem.title}
                articles={articleItem.articles}
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
  const lat = 35.4122  // 取得したい地域の緯度と軽度を代入する。
  const lon = 139.4130 // 今回は、東京で設定します。
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=${process.env.WEATHER_API_KEY}`
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
  const covidRes = await fetch(
    `https://newsapi.org/v2/everything?q=covid-19&language=jp&sortBy=popularity&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
  );
  const covidJson = await covidRes.json();
  const covidArticles = covidJson?.articles;

  // NewsAPIのピックアップ記事の情報を取得
  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=software&language=jp&sortBy=popularity&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
  );
  const pickupJson = await pickupRes.json();
  const pickupArticles = pickupJson?.articles;


  // propsとしてweatherNews,topArticles,covidArticles,pickupArticlesを返す。
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

```