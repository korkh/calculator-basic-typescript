import st from "../../styles/Button.module.css";

interface Props {
  value: string | number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  theme?: "green" | "dark";
}

const Button = ({ value, onClick, theme }: Props) => {
  let buttonClassName = st.button; // Default class

  if (["+-", "%", "+", "-", "/", "X"].includes(value as string)) {
    buttonClassName = st.signMain;
  } else if (value === "=") {
    buttonClassName = [st.buttonMain, st.equals].join(" ");
  } else if (value === "C") {
    buttonClassName = st.signC;
  }

  const themeClassName = theme === "dark" ? st.buttonDark : st.buttonGreen;

  return (
    <button
      type="button"
      className={`${buttonClassName} ${themeClassName}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
