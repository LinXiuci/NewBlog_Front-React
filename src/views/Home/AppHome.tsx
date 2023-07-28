import { CSSProperties, useEffect, useRef, useState } from "react";
import AppIcon from "../../common/AppIcon/AppIcon";

// 导入个人信息API
import personalInformationAPI from "../../api/personalInformationAPI";
import "./css/app-home.css";
import AppFooter from "../../common/AppFooter/AppFooter";

interface personalInformationType {
  author: string;
  avatar: string;
  introduction: (
    | {
        key: number;
        title: string;
        text: string;
        name?: undefined;
      }
    | {
        key: string;
        name: string;
        text: string;
        title?: undefined;
      }
  )[];
}

type timeInfoType = {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
  week: string;
};

/***
 * @description 公共页面 - 首页
 *  */
function AppHome() {
  // 作者名、头像、个人简介
  const { author, avatar, introduction }: personalInformationType = personalInformationAPI;

  // 下一页索引
  const [index, setIndex] = useState<number>(0);

  // 下一页
  const handleNext = () => {
    let currnetIndex = index + 1;
    //  当“currnetIndex >= introduction.length”时，循环切换到第一个
    if (currnetIndex >= introduction.length) currnetIndex = 0;

    setIndex(currnetIndex);
  };

  // 设置时间变量
  const [time, setTime] = useState<timeInfoType>({
    year: 2023,
    month: 1,
    date: 1,
    hour: 0,
    minute: 0,
    second: 0,
    week: "null",
  });

  // 获取当前时间（年、月、日、时、分、秒、星期）
  useEffect(() => {
    const interval = setInterval(() => {
      let today = new Date();
      // 年、月、日
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let date = today.getDate();

      // 时、分、秒
      let hour = Number(today.getHours().toString().padStart(2, "0"));
      let minute = Number(today.getMinutes().toString().padStart(2, "0"));
      let second = Number(today.getSeconds().toString().padStart(2, "0"));
      // 星期
      let day = today.getDay();
      let dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let week = dayList[day];
      setTime({ year, month, date, hour, minute, second, week });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 操作 时针、分针、秒针 DOM 元素
  const hourElementRef = useRef<HTMLDivElement>(null);
  const minuteElementRef = useRef<HTMLDivElement>(null);
  const secondElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hourAngle = (time.hour % 12) * 30 + time.minute / 2;
    let minuteAngle = time.minute * 6;
    let secondAngle = time.second * 6;

    // 计算时、分、秒的角度
    if (hourElementRef.current) hourElementRef.current.style.transform = `rotate(${hourAngle}deg)`;
    if (minuteElementRef.current) minuteElementRef.current.style.transform = `rotate(${minuteAngle}deg)`;
    if (secondElementRef.current) secondElementRef.current.style.transform = `rotate(${secondAngle}deg)`;
  }, [time]);

  return (
    <main className="app-home">
      <section className="app-home-main">
        {/* 个人简介 */}
        <section className="app-personal-profile">
          {/* 个人签名{author || "Vehchi"} */}
          <article className="app-personal-signature">{author || "Vehchi"}</article>
          {/*  */}
          <article className="app-profile-container">
            {/* 文本 */}
            <p>{introduction[index].text}</p>
            <p>
              {/* 行列与标题 */}
              <span>
                0{index + 1}&nbsp;-&nbsp;{introduction[index].title}
              </span>
              {/* 下一页 */}
              <span onClick={handleNext}>Next</span>
            </p>
          </article>
        </section>

        {/* 时间容器 */}
        <section className="app-home-time">
          {/* 时钟 */}
          <article className="app-home-clock">
            <div className="app-home-clock-container">
              <div className="app-home-clock-hour" ref={hourElementRef}></div>
              <div className="app-home-clock-minute" ref={minuteElementRef}></div>
              <div className="app-home-clock-second" ref={secondElementRef}></div>
            </div>
          </article>

          {/* 星期 */}
          <article className="app-home-week">{time.week}</article>

          {/* 年、月、日 */}
          <article className="app-home-year-month-date">
            {time.month}&nbsp;/&nbsp;{time.date},&nbsp;{time.year}.
          </article>

          {/* 动态-圆柱波形 */}
          <article className="app-home-trends">
            <div style={{ "--i": 12 } as CSSProperties}></div>
            <div style={{ "--i": 2 } as CSSProperties}></div>
            <div style={{ "--i": 5 } as CSSProperties}></div>
            <div style={{ "--i": 10 } as CSSProperties}></div>
            <div style={{ "--i": 7 } as CSSProperties}></div>
            <div style={{ "--i": 8 } as CSSProperties}></div>
            <div style={{ "--i": 6 } as CSSProperties}></div>
            <div style={{ "--i": 9 } as CSSProperties}></div>
            <div style={{ "--i": 2 } as CSSProperties}></div>
            <div style={{ "--i": 4 } as CSSProperties}></div>
            <div style={{ "--i": 11 } as CSSProperties}></div>
            <div style={{ "--i": 5 } as CSSProperties}></div>
          </article>

          {/* 时间 */}
          <article className="app-home-show-time">
            {time.hour}:{time.minute > 10 ? time.minute : "0" + time.minute}
          </article>
        </section>
      </section>
      <AppFooter></AppFooter>
    </main>
  );
}

export default AppHome;
