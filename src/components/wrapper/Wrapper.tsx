import st from "../../styles/Wrapper.module.css";

interface Props {
  children: any;
}

const Wrapper = ({ children }: Props) => {
  return <div className={st.wrapper}>{children}</div>;
};

export default Wrapper;
