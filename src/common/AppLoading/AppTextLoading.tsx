import { CSSProperties } from "react";
import "../style/app-loading.css"


/***
 * 文字型 loading
 *  */
/***
 * @description 公共组件 - 文字型 loading
 *  */
function AppTextLoading() {
  return (
    <span className="app-text-loading">
      {/* <span style={{ "--i": 8 } as CSSProperties}>L</span>
      <span style={{ "--i": 2 } as CSSProperties}>o</span>
      <span style={{ "--i": 5 } as CSSProperties}>a</span>
      <span style={{ "--i": 10 } as CSSProperties}>d</span>
      <span style={{ "--i": 5 } as CSSProperties}>i</span>
      <span style={{ "--i": 8 } as CSSProperties}>n</span>
      <span style={{ "--i": 2 } as CSSProperties}>g</span>
      <span style={{ "--i": 3 } as CSSProperties}>...</span> */}
      <span style={{ "--i": 1 } as CSSProperties}>L</span>
      <span style={{ "--i": 2 } as CSSProperties}>o</span>
      <span style={{ "--i": 3 } as CSSProperties}>a</span>
      <span style={{ "--i": 4 } as CSSProperties}>d</span>
      <span style={{ "--i": 5 } as CSSProperties}>i</span>
      <span style={{ "--i": 6 } as CSSProperties}>n</span>
      <span style={{ "--i": 7 } as CSSProperties}>g</span>
      <span style={{ "--i": 8 } as CSSProperties}>...</span>
    </span>
  );
}

export default AppTextLoading;
