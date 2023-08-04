/**
 * 组件-打字机
 *  */
const TypewriterComponent = ({ text }: any) => {
  return <div className="typewriter">{text.length > 4 ? text.slice(0, 4) + " ..." : text}</div>;
};
export default TypewriterComponent;
