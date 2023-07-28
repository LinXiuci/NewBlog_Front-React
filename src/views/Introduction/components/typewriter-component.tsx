import "../style/app-component.css";

/**
 * 组件-打字机
 *  */
const Typewriter = ({ text }: any) => {
  return <div className="typewriter">{text.length > 4 ? text.slice(0, 4) + " ..." : text}</div>;
};
export default Typewriter;
