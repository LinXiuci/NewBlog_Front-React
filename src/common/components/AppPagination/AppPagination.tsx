interface paginationProps {
  onPreviousClick: () => void; // 上一页按钮被点击的回调函数
  onNextClick: () => void; // 下一页按钮被点击的回调函数
  isPreviousDisabled: boolean; // 判断上一页按钮是否可用
  isNextDisabled: boolean; // 判断下一页按钮是否可用
}
/**
 * @description 公共组件 - 分页
 * @param{function} onPreviousClick 上一页按钮被点击的回调函数
 * @param{function} onNextClick 下一页按钮被点击的回调函数
 * @param{boolean}  isPreviousDisabled 判断上一页按钮是否可用
 * @param{boolean}  isNextDisabled 判下上一页按钮是否可用
 *  */
function AppPagination({ onPreviousClick, onNextClick, isPreviousDisabled, isNextDisabled }: paginationProps) {
  return (
    <>
      <button className="page-link" onClick={onPreviousClick} disabled={isPreviousDisabled}>
        &lt;
      </button>
      <button className="page-link" onClick={onNextClick} disabled={isNextDisabled}>
        &gt;
      </button>
    </>
  );
}

export default AppPagination;
