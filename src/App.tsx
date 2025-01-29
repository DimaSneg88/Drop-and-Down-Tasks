import { useEffect, useState } from "react";
import AddTask from "./components/addTask/AddTask";
import TaskColumn from "./components/taskColumn/TaskColumn";
import TaskMeter from "./components/taskMeter/TaskMeter";
import { Status, Task } from "./types";

function App() {
  const [taskList, setTaskList] = useState<Task[]>(getTaskList());

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]); //локальное хранилище для извлечения данных хранящихся в браузере

  const blockList = taskList.filter((elem) => elem.status === Status.Block);
  const todoList = taskList.filter((elem) => elem.status === Status.Todo);
  const progressList = taskList.filter(
    (elem) => elem.status === Status.OnProgress
  );
  const doneList = taskList.filter((elem) => elem.status === Status.Done);

  function addTask(item: Task) {
    setTaskList((prev) => [...prev, item]);
  }

  function getTaskList() {
    const saveList = localStorage.getItem("taskList");
    if (saveList) {
      return JSON.parse(saveList);
    }
    return [];
  }

  function changeTaskStatus(item: Task, status: Status) {
    setTaskList((prev) => prev.filter((elem) => elem.id != item.id));
    setTaskList((prev) => [...prev, item]);
    setTaskList((prev) =>
      prev.map((elem) => {
        if (elem.id === item.id) {
          elem.status = status;
        }
        return elem;
      })
    );
  }

  return (
    <>
      <header className="header">
        <TaskMeter completeCount={doneList.length} allCount={taskList.length} />
        <AddTask addTask={addTask} />
      </header>
      <main className="main">
        <TaskColumn
          changeTaskStatus={changeTaskStatus}
          list={blockList}
          status={Status.Block}
        />
        <TaskColumn
          changeTaskStatus={changeTaskStatus}
          list={todoList}
          status={Status.Todo}
        />
        <TaskColumn
          changeTaskStatus={changeTaskStatus}
          list={progressList}
          status={Status.OnProgress}
        />
        <TaskColumn
          changeTaskStatus={changeTaskStatus}
          list={doneList}
          status={Status.Done}
        />
      </main>
    </>
  );
}

export default App;
