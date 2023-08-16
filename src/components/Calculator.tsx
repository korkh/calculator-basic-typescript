import ButtonPlate from "../components/buttonPlate/ButtonPlate";
import Button from "../components/buttons/Button";
import Display from "../components/display/Display";
import Wrapper from "../components/wrapper/Wrapper";
import { useEffect, useState } from "react";
import ICalculation from "../Interfaces/ICalculation";
import ToggleButton from "./buttons/ToggleButton";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num: any) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 "); //adding spaces after each 3rd digit (but not behind coma), 1234567 => 1 234 567

const removeSpaces = (num: any) => num.toString().replace(/\s/g, "");

const Calculator = () => {
  const [calc, setCalc] = useState<ICalculation>({
    sign: "",
    num: 0,
    res: 0,
  });

  //const [buttonPresses, setButtonPresses] = useState<string[]>([]); //history control

  const [buttonPresses, setButtonPresses] = useState<string[]>([]);

  //just for control. Remove before production
  useEffect(() => {
    console.log(buttonPresses);
  }, [buttonPresses]);

  const [theme, setTheme] = useState<"dark" | "green">("dark");

  const numClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;

    if (removeSpaces(calc.num).length < 14) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
    if (removeSpaces(buttonPresses).length < 14) {
      setButtonPresses([...buttonPresses, value]);
    }
  };

  const commaClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
    setButtonPresses([...buttonPresses, value]);
  };

  const signClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
    setButtonPresses([...buttonPresses, value]);
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a: number, b: number, sign: string) => {
        switch (sign) {
          case "+":
            return a + b;
          case "-":
            return a - b;
          case "/":
            return a / b;
          case "X":
            return a * b;
          default:
            return 0;
        }
      };

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
    setButtonPresses([]);
  };

  const invertClickHandler = () => {
    let newNum = {
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    };

    setCalc(newNum);
    setButtonPresses([newNum.num.toLocaleString()]);
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
    setButtonPresses([num.toString()]);
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
    setButtonPresses([]);
  };

  function getClickHandler(btn: string | number) {
    switch (btn) {
      case "C":
        return resetClickHandler;
      case "+-":
        return invertClickHandler;
      case "%":
        return percentClickHandler;
      case "=":
        return equalsClickHandler;
      case "/":
      case "X":
      case "-":
      case "+":
        return signClickHandler;
      case ".":
        return commaClickHandler;
      default:
        return numClickHandler;
    }
  }

  return (
    <Wrapper>
      <Display
        expression={buttonPresses}
        value={calc.num ? calc.num : calc.res}
      />
      <ToggleButton
        onClick={() => setTheme(theme === "green" ? "dark" : "green")}
      />
      <ButtonPlate>
        {btnValues.flat().map((btn, i) => (
          <Button
            key={i}
            value={btn}
            theme={theme}
            onClick={getClickHandler(btn)}
          />
        ))}
      </ButtonPlate>
    </Wrapper>
  );
};

export default Calculator;
