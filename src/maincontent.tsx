import React, { use } from "react";
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
    category: string;
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
    const [deadline, setDeadline] = useState('');
    const [prio, setPrio] = useState('');
    const [notes, setNotes] = useState('');
    const [category, setCategory] = useState('');
    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
    const [isCatVisible, setisCatVisible] = useState(false);
    const [isEdit, setisEdit] = useState(false);
    const [editIndex, seteditIndex] = useState(-1);
    const cats = ['Arbeit', 'Schule', 'Haus', 'Freizeit', 'Sport', 'Vereine', 'Garten'];


    const addTask = () => {
        if (!title || !deadline || !notes) {
            alert('Bitte alle Felder ausfüllen');
            return
        }
        const newTask = getTaskObject();
        console.log(newTask);
        const updatedTodos = [...todos, newTask];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        toggleAddTask();
        removeFields();

    }

    const removeFields = () => {
        setTitle('');
        setPrio('');
        setDeadline('');
        setNotes('');
        setCategory('');
    }

    const getTaskObject = () => {
        return {
            title: title,
            description: '',
            prio: prio,
            status: 'undone',
            deadline: deadline,
            notes: notes,
            category: category,
        };
    }


    const deleteTask = (indexToDelete: number) => {
        const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        console.log(todos);

    }

    const toggleAddTask = () => {
        setIsAddTaskVisible(!isAddTaskVisible);
        if (isEdit) {
            setisEdit(!isEdit);
        }
    }

    const setPriority = (newPrio: string) => {
        console.log(newPrio);
        setPrio(newPrio);

    }
    const toggleCatDropdown = () => {
        setisCatVisible(!isCatVisible);
        console.log(isCatVisible);

    }

    const editTask = (todo: any, indexToUpdate: number) => {
        setisEdit(!isEdit)
        seteditIndex(indexToUpdate);
        console.log(isEdit);
        setValues(todo);
        toggleAddTask();

    }

    const setValues = (todo: any) => {
        setTitle(todo.title);
        setPrio(todo.prio);
        setDeadline(todo.deadline);
        setNotes(todo.notes);
        setCategory(todo.category);
    }

    const saveEdit = () => {
        console.log(editIndex);
        const editedTask = getTaskObject();
        const updatedTodos = todos.map((todo, index) => {
            if (index === editIndex) {
                return editedTask
            }
            return todo
        });
        setTodos(updatedTodos);
        toggleAddTask();
    }


    const updateTodos = (newData: string, indexToUpdate: number, key: string) => {
        const updatedTodos = todos.map((todo, index) => {
            if (index === indexToUpdate) {
                return { ...todo, [key]: newData };
            }
            return todo
        })
        setTodos(updatedTodos);
        console.log(updatedTodos);

        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    return (
        <section >
            {isAddTaskVisible && (
                <div className="overlay">
                    <div className="addTask">
                        <h2>Neue Aufgabe</h2>
                        <input type="text" placeholder="Titel" value={title} onChange={e => setTitle(e.target.value)} />
                        <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
                        <div className="taskBtnContainer">
                            <span>Priorität</span>
                            <div className="taskBtns">
                                <button className={prio !== 'high' ? 'taskBtnsHighlight' : ''} onClick={() => setPriority('high')}>Hoch</button>
                                <button className={prio !== 'medium' ? 'taskBtnsHighlight' : ''} onClick={() => setPriority('medium')}>Mittel</button>
                                <button className={prio !== 'low' ? 'taskBtnsHighlight' : ''} onClick={() => setPriority('low')}>Niedrig</button>
                            </div>
                        </div>
                        {/* <input onClick={openCategory} type="text" value={category} placeholder="Kategorie" /> */}
                        <div onClick={toggleCatDropdown} className="categoryContainer">
                            <span>{category || 'Kategorie'}</span>
                            {isCatVisible && (
                                <div className="catDropdown">
                                    {cats.map((cat, index) => (
                                        <div onClick={() => { setCategory(cat); toggleCatDropdown() }} key={cat}>
                                            <span>{cat}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <textarea className="addTaskText" value={notes} name="" id="" placeholder="Notiz" onChange={e => setNotes(e.target.value)}></textarea>
                        <div className="btns">
                            <button onClick={toggleAddTask}>Abbrechen</button>
                            {!isEdit && (
                                <button onClick={addTask}>Task speichern</button>
                            )}

                            {isEdit && (
                                <button onClick={saveEdit}>Änderung speichern</button>
                            )}

                        </div>

                    </div>
                </div>

            )
            }
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
                                    <div onClick={() => updateTodos('high', index, 'prio')} className="prioContainer">
                                        {todo.prio === 'high' && (
                                            <div >
                                                <span>{todo.category}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div onClick={() => updateTodos('medium', index, 'prio')} className="prioContainer">
                                        {todo.prio === 'medium' && (
                                            <div >
                                                <span>{todo.category}</span>
                                            </div>
                                        )}

                                    </div>
                                    <div onClick={() => updateTodos('low', index, 'prio')} className="prioContainer">
                                        {todo.prio === 'low' && (
                                            <div >
                                                <span>{todo.category}</span>
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
                                        <span>{todo.deadline}</span>
                                    </div>
                                    <div onClick={() => updateTodos('undone', index, 'status')} className="stateContainer">
                                        {todo.status === 'undone' && (

                                            <img src="/img/clock.svg" alt="" />
                                        )}

                                    </div>
                                    <div onClick={() => updateTodos('progress', index, 'status')} className="stateContainer">
                                        {todo.status === 'progress' && (
                                            <img src="/img/progress.svg" alt="" />
                                        )}
                                    </div>
                                    <div onClick={() => updateTodos('done', index, 'status')} className="stateContainer">
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
                                        <textarea name="" value={todo.notes} id="" placeholder="Notizen eingeben" onChange={(e) => updateTodos(e.target.value, index, 'notes')}></textarea>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="options">
                            <h2>Optionen</h2>
                            <div className="placeholder borderBottom"></div>
                            {todos.map((todo, index) => (
                                <div className="editTask" key={index}>
                                    <button onClick={() => editTask(todo, index)}><img src="/img/edit.svg" alt="" /></button>
                                    <button onClick={() => deleteTask(index)}><img src="/img/delete.svg" alt="" /></button>
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

        </section >

    );
}

export default MainContent;
