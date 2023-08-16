import st from "../../styles/Display.module.css";
import Expression from "./Expression";

interface Props {
  value: string | number;
  expression: any;
}

const Display = ({ value, expression }: Props) => {
  return (
    <div className={st.wrapper}>
      <div className={st.expression}>
        <Expression expression={expression} />
      </div>
      <div className={st.display}>{value}</div>
    </div>
  );
};

export default Display;
