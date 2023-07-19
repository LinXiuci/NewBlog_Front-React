import { SetStateAction, useEffect, useRef } from "react";

/***
 * @description 组件 - 文字容器
 *  */
function TextWraperComponent({ text }: any) {
  const textWraperRef = useRef<HTMLDivElement>(null);
  const lieNum = 31;
  const textWraperHeight = textWraperRef.current?.offsetHeight || 0;
  const fragment = document.createDocumentFragment();
  const speed = 60;
  let translateZ = 10;
  const num = Math.ceil(lieNum / 2);
  useEffect(() => {
    for (let i = 0; i < lieNum; i++) {
      const element = document.createElement("span");
      if (i === num) {
        element.classList.add("center");
      } else {
        element.style.paddingTop = `${getRandomInt(0, textWraperHeight - 80)}px`;
      }

      if (i <= num) {
        translateZ += speed;
      } else {
        translateZ -= speed;
      }

      element.style.transform = `translateZ(${translateZ}px)`;
      element.innerText = text;
      fragment.appendChild(element);
    }

    textWraperRef.current?.appendChild(fragment);

    return () => {
      // 在组件卸载时清除生成的元素
      textWraperRef.current!.innerHTML = "";
    };
  }, [textWraperHeight, num]);
  return <section className="introduction-text-wraper" ref={textWraperRef}></section>;
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default TextWraperComponent;
