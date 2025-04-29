import React from "react";
import './maincontent.scss';
import { useState } from "react";
import { log } from "console";
import { get } from "http";

interface Task {
    title: string;
    description: string;
    prio: string;
    status: string;
    deadline: string;
    notes: string;
}

const MainContent = () => {
    const loadTasks = () => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            return JSON.parse(storedTodos); // Gibt das Array der Aufgaben zurück
        }
        return []; // Wenn keine Aufgaben gespeichert sind, gebe ein leeres Array zurück
    };
    const [todos, setTodos] = useState<Task[]>(loadTasks);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [prio, setPrio] = useState('');
    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPrio(event.target.value);
    };



    const addTask = () => {
        if (!title || !desc || !prio) {
            alert('Bitte alle Felder ausfüllen');
            return
        }
        const newTask = {
            title: title,
            description: desc,
            prio: prio,
            status: 'undone',
            deadline: new Date().toDateString(),
            notes: '',
        };
        console.log(newTask);
        const updatedTodos = [...todos, newTask];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        toggleAddTask();
    }



    const deleteTask = (indexToDelete: number) => {
        const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        console.log(todos);

    }

    const toggleAddTask = () => {
        setIsAddTaskVisible(!isAddTaskVisible);
    }

    const addNote = (index: number) => {
        console.log(index);

    }

    const changePriority = (newPrio: string, indexToUpdate: number) => {
        console.log(newPrio, indexToUpdate);
        const updatedTodos = todos.map((todo, index) => {
            if (index === indexToUpdate) {
                return { ...todo, prio: newPrio }
            }
            return todo;
        });
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    const changeState = (newState: string, indexToUpdate: number) => {
        const updatedTodos = todos.map((todo, index) => {
            if (index === indexToUpdate) {
                return { ...todo, status:newState }
            }
            return todo
        });
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    const updateNotes=(newNote:string, indexToUpdate:number)=>{
        const updatedTodos=todos.map((todo, index)=>{
            if (index===indexToUpdate) {
                return {...todo, notes:newNote}
            }
            return todo;
        });
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    return (
        <section >
            {isAddTaskVisible && (
                <div className="overlay">
                    <div className="addTask">
                        <h2>Neue Aufgabe</h2>
                        <input type="text" placeholder="Titel" value={title} onChange={e => setTitle(e.target.value)} />
                        <input type="date" placeholder="Beschreibung" value={desc} onChange={e => setDesc(e.target.value)} />
                        {/* <select name="priority" value={prio} onChange={handleChange} id="">
                            <option value="" disabled hidden>Priorität auswählen</option>
                            <option value="high">Hoch</option>
                            <option value="medium">Mittel</option>
                            <option value="low">Niegrig</option>
                        </select> */}
                        <textarea className="addTaskText" name="" id="" placeholder="Notiz"></textarea>
                        <div className="btns">
                            <button onClick={toggleAddTask}>Abbrechen</button>
                            <button onClick={addTask}>Task speichern</button>
                        </div>

                    </div>
                </div>

            )}
           <div className="main">
                <button onClick={toggleAddTask}>Neue Aufgabe</button>
                <div>
                    <div className="headlineContainer">
                        <div className="todos">
                            <h2>To Do</h2>
                            <div className="placeholder borderBottom"></div>
                            {todos.map((todo, index) => (
                                <div key={index} className="todo">
                                    <div>
                                    <span>{todo.title}</span>
                                    </div>
                                 
                                </div>
                            ))}
                        </div>
                        <div className="priorities">
                            <h2>Prioritäten</h2>
                            <div className="prios borderBottom">
                                <div className="high"><span>Hoch</span></div>
                                <div className="medium"><span>Mittel</span></div>
                                <div className="low"><span>Niedrig</span></div>
                            </div>
                            {todos.map((todo, index) => (
                                <div className="prioRow" key={index}>
                                    <div onClick={() => changePriority('high', index)} className="prioContainer">
                                        {todo.prio === 'high' && (
                                            <div >
                                                <span>{todo.description}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div onClick={() => changePriority('medium', index)} className="prioContainer">
                                        {todo.prio === 'medium' && (
                                            <div >
                                                <span>{todo.description}</span>
                                            </div>
                                        )}

                                    </div>
                                    <div onClick={() => changePriority('low', index)} className="prioContainer">
                                        {todo.prio === 'low' && (
                                            <div >
                                                <span>{todo.description}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="states">
                            <h2>Status</h2>
                            <div className="state borderBottom">
                                <span>Frist</span>
                                <span>Offen</span>
                                <span>In Bearbeitung</span>
                                <span>Erledigt</span>
                            </div>
                            {todos.map((todo, index) => (
                                <div className="stateRows" key={index}>
                                    <div className="deadline stateContainer">
                                        <span></span>
                                    </div>
                                    <div onClick={() => changeState('undone', index)} className="stateContainer">
                                        {todo.status === 'undone' && (

                                            <img src="/img/clock.svg" alt="" />
                                        )}

                                    </div>
                                    <div onClick={() => changeState('progress', index)} className="stateContainer">
                                        {todo.status === 'progress' && (
                                            <img src="/img/progress.svg" alt="" />
                                        )}
                                    </div>
                                    <div onClick={() => changeState('done', index)} className="stateContainer">
                                        {todo.status === 'done' && (
                                            < img src="/img/done.svg" alt="" />
                                        )}

                                    </div>
                                </div>

                            ))}
                        </div>
                        <div className="notes">
                            <h2>Notizen</h2>
                            <div className="placeholder borderBottom"></div>
                            {todos.map((todo, index) => (
                                <div className="notesContainer" key={index}>
                                    {/* <div className="notesSubContainer">
                                        <span>Notizen</span>
                                    </div> */}
                                    <div className="text">
                                        <textarea name="" value={todo.notes} id="" placeholder="Notizen eingeben" onChange={(e)=>updateNotes(e.target.value, index)}></textarea>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {

                /*  <div className="task">
 
                     {todos.map((task, index) => (
                         <div className="taskCard" key={index}>
                             <div className="btnContainer">
                             <button className="closeBTN"><img src="./img/edit.svg" alt="" /></button>
                                 <button className="closeBTN"><img src="./img/check.svg" alt="" /></button>
                                 <button onClick={() => deleteTask(index)} className="closeBTN"><img src="./img/close.svg" alt="" /></button>
                             </div>
                             <h2>{task.title}</h2>
                             <p>{task.description}</p>
                             <span>{task.prio}</span>
                         </div>
 
                     ))}
                 </div>
         */

            }
            <img src="/img/IMG_1715.WEBP" alt="" />
        </section >

    );
}

export default MainContent;