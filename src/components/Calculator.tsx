import {useState, useEffect} from "react";
import {evaluate} from "mathjs";
import "./Calculator.css";

const Calculator = () => {
  const [value, setValue] = useState<string>("0");

  const isOperator = (char: string): boolean => {
    return ["+", "-", "*", "/"].includes(char);
  };

  const handleInput = (input: string) => {
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

  // handleClick uses input handler
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    handleInput(e.currentTarget.value);
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
      // Prevent evaluation if the last character is an operator
      if (isOperator(value.slice(-1))) return;

      const result = evaluate(value);
      setValue(result.toString());
    } catch {
      setValue("Error");
    }
  };

  // 2. Add useEffect to listen for keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      const {key} = event;

      if (/\d/.test(key) || key === ".") {
        handleInput(key);
      } else if (isOperator(key)) {
        handleInput(key);
      } else if (key === "Enter" || key === "=") {
        handleCalculate();
      } else if (key === "Backspace") {
        handleDelete();
      } else if (key === "Escape") {
        handleClear();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [value]);

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

export default Calculator;
