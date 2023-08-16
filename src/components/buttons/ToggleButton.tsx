import { useState } from "react";
import st from "../../styles/ToggleButton.module.css";

interface Props {
  onClick: () => void;
}

const ToggleButton = ({ onClick }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => {
    setIsActive(!isActive);
    onClick(); // Call the onClick function from props
  };

  return (
    <div
      className={`${st.switch} ${isActive ? st.active : ""}`}
      onClick={toggleSwitch}
    >
      <div className={st.slider} />
    </div>
  );
};

export default ToggleButton;
