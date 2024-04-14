import styles from "./index.module.scss";
import { useTodoStore } from "../../data/stores/useTodoStore";
import { useCallback, useEffect } from "react";
import InputAdd from "../components/InputAdd";
import InputTask from "../components/InputTask";


export const App: React.FC = () => {
    console.log("component render")

    const [ tasks, createTask, updateTask, removeTask, clearTasks ] = useTodoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
        state.clearTasks,
    ])

    function onAddHandler(title: string) {
        if(title) {
            createTask(title);
        }
    }

    // console.log(tasks)

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>Todo App</h1>
            <section className={styles.articleSection}>
                <InputAdd onAdd={onAddHandler}/>
            </section>
            <section className={styles.articleSection}>
                { !tasks.length && (
                    <p className={styles.articleText}>There is no task</p>
                )}

                { tasks.map((task) => (
                    <InputTask key={task.id} id={task.id} title={task.title} onDone={removeTask} onEdited={updateTask} onRemoved={removeTask}/>
                ))}

            </section>
        </article>
    );
}