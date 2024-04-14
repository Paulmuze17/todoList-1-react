import { useCallback, useState } from "react";
import styles from "./index.module.scss";

interface IInputPlusProps {
    onAdd: (title: string) => void;
}

export default function InputAdd({ onAdd }: IInputPlusProps) {
    const [inputValue, setInputValue] = useState('');

    const addNewTask = useCallback(() => {
        onAdd(inputValue);
        setInputValue("");

    }, [inputValue]);

    function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.key === "Enter") {
            addNewTask();
        }
    }

    return (
        <div className={styles.inputAdd}>
            <input className={styles.inputAddValue} type="text" value={inputValue} onChange={(event) => {setInputValue(event.target.value)}} onKeyDown={(event) => onKeyDownHandler} placeholder="Create a new task..."/>
            <button className={styles.inputAddBtn} onClick={addNewTask} aria-label="Add"></button>
        </div>
    );
}