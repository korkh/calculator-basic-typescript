import st from "../../styles/ButtonPlate.module.css";

interface Props {
  children: any;
}

const ButtonPlate = ({ children }: Props) => {
  return <div className={st.buttonPlate}>{children}</div>;
};

export default ButtonPlate;
