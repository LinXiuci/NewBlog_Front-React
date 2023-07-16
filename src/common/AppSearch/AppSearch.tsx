import { useState, useEffect, useRef, RefObject, SetStateAction } from "react";
import AppPagination from "../AppPagination/AppPagination";
import AppTextLoading from "../AppLoading/AppTextLoading";
import debounce from "../../utils/debounce";
import { getSearchResources } from "../../api/app-search-api";
import "../style/app-search.css";

interface searchResultType {
  key: string;
  title: string;
  isTop: boolean;
  create_time: string;
  count_time: string;
  tags: string;
  cover_img: string;
  describe: string;
  content: string;
}

/***
 * @description 公共组件 - 搜索组件
 *  */
function AppSearch({ disableScroll, enableScroll }: any) {
  // 关键字
  const [keywords, setkeywords] = useState<string>("");
  // 根据 keywords 进行查询，查询结束后显示的内容  //
  const [data, setData] = useState<searchResultType[]>([]);
  // error
  const [error, setError] = useState<Error | null>(null);
  // loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 根据 keywords 请求文章资源
  const fetchResults = debounce(async () => {
    if (!keywords) {
      setData([]);
      return;
    }
    setIsLoading(true);
    const { results, error } = await getSearchResources<searchResultType>(keywords);
    setData(results);
    setIsLoading(false);
    setError(error);
  }, 1000);

  useEffect(() => {
    fetchResults();
  }, [keywords]);

  // 是否显示搜索框
  const [isShow, setShow] = useState<boolean>(false);
  // 操作搜索框元素
  const inputRef = useRef<HTMLInputElement>(null);
  // 清空文字按钮元素
  const showClearButtonRef = useRef<HTMLDivElement>(null);

  // 显示搜索框
  const handleOpenSearch = (): void => {
    disableScroll();
    setShow(true);
  };

  // 关闭搜索框
  const handleCloseSeaarch = (): void => {
    enableScroll();
    setShow(false);
  };

  // 当 isShow 为 true 时，useEffect 钩子会自动触发，检查 inputRef.current 是否存在，如果存在，则会聚焦到输入框上。
  useEffect(() => {
    if (isShow && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShow]);

  // 监听 input 里的内容。若 value 长度为0，则输入框已被清空，关闭 button 则去掉。
  const handleKeywordChange = (event: { target: { value: SetStateAction<string> } }): void => {
    if (event.target.value.toString().trim().length === 0) {
      setkeywords("");
      showClearButtonRef.current?.classList.remove("active");
    } else {
      setkeywords(event.target.value.toString().trim());
      showClearButtonRef.current?.classList.add("active");
    }
  };

  // 清空搜索框里的内容
  const handleClearKeyword = (): void => {
    if (keywords.length === 0) return;
    setkeywords("");
    showClearButtonRef.current?.classList.remove("active");
  };

  return (
    <main className="app-search">
      <p onClick={handleOpenSearch}>SH</p>
      {isShow && (
        <section className="app-search-mask">
          <article className="app-search-container">
            {/* 搜索-nav */}
            <header className="app-search-nav">
              <span>SEARCH</span>
              <span onClick={handleCloseSeaarch}>关闭</span>
            </header>
            {/* 搜索框组件 */}
            <InputComponent
              inputRef={inputRef}
              keywords={keywords}
              handleKeywordChange={handleKeywordChange}
              handleClearKeyword={handleClearKeyword}
              showClearButtonRef={showClearButtonRef}
            ></InputComponent>
            {/* 展示内容组件 */}
            <DisplayContentComponent
              currentPage={1}
              pageDisplayContent={6}
              data={data}
              isLoading={isLoading}
            ></DisplayContentComponent>
          </article>
        </section>
      )}
    </main>
  );
}

type InputComponentType = {
  keywords: string;
  inputRef: RefObject<HTMLInputElement>;
  showClearButtonRef: RefObject<HTMLDivElement>;
  handleKeywordChange: (event: { target: { value: SetStateAction<string> } }) => void;
  handleClearKeyword: () => void;
};

/**
 * @description 组件 - 输入框组件
 *  */
const InputComponent = (props: InputComponentType) => {
  const { inputRef, keywords, handleKeywordChange, handleClearKeyword, showClearButtonRef } = props;
  return (
    <nav className="app-search-input">
      {/* 搜索框 */}
      <input
        className="app-search-input-container"
        type="text"
        placeholder="搜索..."
        ref={inputRef}
        value={keywords}
        onChange={handleKeywordChange}
      />
      {/* 清空搜索框内容 */}
      <div className="app-search-clear-container">
        <div className="app-search-clear" onClick={handleClearKeyword} ref={showClearButtonRef}>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

interface displayContentComponentType {
  currentPage: number; // 当前页，默认第1页
  pageDisplayContent: number; // 当前页需要显示的内容，默认展示6条内容
  data: searchResultType[]; // 查询结束后的内容
  isLoading: boolean;
}

/**
 * @description 组件 - 内容展示
 **/
const DisplayContentComponent = ({ currentPage = 1, pageDisplayContent = 6, data, isLoading }: displayContentComponentType) => {
  // 当前页
  const [current, setCurrent] = useState<number>(currentPage);
  // 设置总页数
  const totalPage = Math.ceil(data.length / pageDisplayContent);
  // 计算当前页面展示的内容
  const pageDisplayContents = data.slice((current - 1) * pageDisplayContent, current * pageDisplayContent);

  // 上一页
  const handlePreviousClick = (): void => {
    setCurrent(current - 1);
  };

  // 下一页
  const handleNextClick = (): void => {
    setCurrent(current + 1);
  };

  // 是否禁用上一页按钮的条件是当前页是否为第一页
  const isPreviousDisabled = current === 1;
  // 是否禁用下一页按钮的条件是当前页加 1 是否等于总页数
  const isNextDisabled = current === totalPage;

  return (
    <>
      {/* 搜索时显示Loading */}
      {isLoading && (
        <div>
          <AppTextLoading></AppTextLoading>
        </div>
      )}

      {/* 当前页需要显示的内容 */}
      {!isLoading && data.length > 0 && (
        <ul className="app-search-results">
          {pageDisplayContents?.map((item) => (
            <li key={item.key}>{item.title}</li>
          ))}
        </ul>
      )}

      {/* 根据当前页面展示的内容，判断是否出现分页 */}
      {pageDisplayContents.length > 0 && (
        <AppPagination
          onPreviousClick={handlePreviousClick}
          onNextClick={handleNextClick}
          isNextDisabled={isNextDisabled}
          isPreviousDisabled={isPreviousDisabled}
        />
      )}

      {/* 搜索计算出来的结果 */}
      <div className="app-search-count-results">
        <span>找出&nbsp;{data.length}&nbsp;条结果</span>
      </div>
    </>
  );
};

export default AppSearch;
