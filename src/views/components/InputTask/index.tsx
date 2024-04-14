import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

interface IInputTaskProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onEdited: (id: string, title: string) => void;
    onRemoved: (id: string) => void;
}

export default function InputTask({ id, title, onDone, onEdited, onRemoved }: IInputTaskProps) {
    const [isChecked, setIsChecked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [inputEditValue, setInputEditValue] = useState(title);
    const inputEditTitleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(isEditMode) {
            inputEditTitleRef?.current?.focus();
        }
    }, [isEditMode]);

    function onCheckHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setIsChecked(event.target.checked);
        if(event.target.checked) {
            setTimeout(() => {
                onDone(id);
            }, 500);
        }
    }

    function onBtnRemoveHandler() {
        if(confirm("Are you sure?")) {
            onRemoved(id);
        }
    }

    function onBtnEditHandler() {
        setIsEditMode(true);
    }

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel} htmlFor="">
                <input className={styles.inputTaskCheckbox} type="checkbox" checked={isChecked} onChange={onCheckHandler} disabled={isEditMode} />

                { isEditMode ? (
                    <input ref={inputEditTitleRef} className={styles.inputTaskInputEdit} type="text" value={inputEditValue} onChange={(event) => {setInputEditValue(event.target.value)}} onKeyDown={(event) => {
                        if(event.key === "Enter") {
                            onEdited(id, inputEditValue);
                            setIsEditMode(false);
                        }
                    }}/>
                ) : (
                    <h3 className={styles.inputTaskTitle}>{title}</h3>
                )}
            </label>

            { isEditMode ? (
                <button className={styles.inputTaskBtnSave} aria-label="Save" onClick={() => {
                    onEdited(id, inputEditValue);
                    setIsEditMode(false);
                }} />
            ) : (
                <button className={styles.inputTaskBtnEdit} aria-label="Edit" onClick={onBtnEditHandler} />
            ) }

         
            <button className={styles.inputTaskBtnDelete} aria-label="Delete" onClick={onBtnRemoveHandler} />
        </div>
    );
}