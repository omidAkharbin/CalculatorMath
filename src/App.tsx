import {useState} from "react";
import {evaluate} from "mathjs";
import "./App.css";

const App = () => {
  const [value, setValue] = useState<string>("0");

  const isOperator = (char: string): boolean => {
    return ["+", "-", "*", "/"].includes(char);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const lastChar = value.slice(-1);

    if ((value === "0" && input === "0") || (value === "00" && input === "00"))
      return;

    if (
      value === "0" ||
      (value === "00" && !isOperator(input) && input !== ".")
    ) {
      setValue(input);
      return;
    }

    if ((value === "" || value === "0") && isOperator(input)) {
      setValue("0" + input);
      return;
    }

    if (isOperator(input) && isOperator(lastChar)) {
      setValue(value.slice(0, -1) + input);
      return;
    }

    setValue(value + input);
  };

  const handleClear = () => setValue("0");

  const handleDelete = () => {
    if (value.length === 1) {
      setValue("0");
    } else {
      setValue(value.slice(0, -1));
    }
  };

  const handleCalculate = () => {
    try {
      if (value === "" || value === "0") {
        setValue("0");
        return;
      }

      const result = evaluate(value);
      setValue(result.toString());
    } catch {
      setValue("Error");
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <form>
          <input type="text" className="display" value={value} readOnly />
          <div>
            <input type="button" value="AC" onClick={handleClear} />
            <input type="button" value="DE" onClick={handleDelete} />
            <input type="button" value="." onClick={handleClick} />
            <input type="button" value="/" onClick={handleClick} />
          </div>
          <div>
            <input type="button" value="7" onClick={handleClick} />
            <input type="button" value="8" onClick={handleClick} />
            <input type="button" value="9" onClick={handleClick} />
            <input type="button" value="*" onClick={handleClick} />
          </div>
          <div>
            <input type="button" value="4" onClick={handleClick} />
            <input type="button" value="5" onClick={handleClick} />
            <input type="button" value="6" onClick={handleClick} />
            <input type="button" value="+" onClick={handleClick} />
          </div>
          <div>
            <input type="button" value="1" onClick={handleClick} />
            <input type="button" value="2" onClick={handleClick} />
            <input type="button" value="3" onClick={handleClick} />
            <input type="button" value="-" onClick={handleClick} />
          </div>
          <div>
            <input type="button" value="00" onClick={handleClick} />
            <input type="button" value="0" onClick={handleClick} />
            <input
              type="button"
              value="="
              onClick={handleCalculate}
              className="equal-sign"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
