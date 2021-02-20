import Image from "next/image";
import styles from "../weather-news/index.module.scss";
import Link from "next/link";
import Props from "../types";

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeatherNews: React.FC<Props> = ({ weatherNews }) => {
  const currentWeatherMain = weatherNews.current.weather[0].main
  const currentWeatherTemp = weatherNews.current.temp
  const currentWeatherIcon = weatherNews.current.weather[0].icon.slice(0, 2) + "d";
  return (
    <section className={styles.weather}>
      <h1>Tokyo</h1>
      <div className={styles.weather__main}>
        <div className={styles.weather__top}>
          <div className={styles.weather__heading}>
            <a>{currentWeatherMain}</a>
            <p>
              {currentWeatherTemp.toString().slice(0, 1)}
              <span>˚c</span>
            </p>
          </div>
          <Image
            className={styles.weather__icon}
            src={`/img/weatherIcons/${currentWeatherIcon}.png`}
            alt="Tokyo's weather icon"
            loading="eager"
            width={52}
            height={52}
            priority
          />
        </div>
        <div className={styles.weather__weekly}>
          <ul className={styles.weather__weekly__list}>
            {weatherNews.daily.map((date, index) => {
              const time = new Date(date.dt * 1000);
              let day = week[time.getDay()];
              const nowDay = week[(new Date()).getDay()]
              if (day ==  nowDay) {
                day = "Today"
              }
              if (index > 4) {
                return;
              }
              return (
                <li key={index}>
                  <p>{day}</p>
                  <span>
                    <Image
                      src={`/img/weatherIcons/${date.weather[0].icon}.png`}
                      className={styles.weatehr__icon}
                      alt={`${day}'s weather icon`}
                      loading="eager"
                      width={41}
                      height={41}
                      priority
                    />
                  </span>
                  <div className={styles.weather__temp}>
                    <p className={styles.weather__temp__high}>
                      {parseInt(date.temp.max.toLocaleString(), 10)}˚c
                    </p>
                    <p className={styles.weather__temp__low}>
                      {parseInt(date.temp.min.toLocaleString(), 10)}˚c
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.weather__bottom}>
          <Link href="https://weathernews.jp/onebox/">
            <a target="_blank" rel="noopener">
              ウェザーニュース
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WeatherNews;
