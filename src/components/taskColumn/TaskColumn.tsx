import classNames from "classnames";
import { dragTypes, Status, statusTitle, Task } from "../../types";
import TaskItem from "../taskItem/TaskItem";
import st from "./TaskColumn.module.scss";
import { useDrop } from "react-dnd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  status: Status;
  list: Task[];
  changeTaskStatus: (item: Task, status: Status) => void;
};

export default function TaskColumn({ status, list, changeTaskStatus }: Props) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: dragTypes.DEFAULT,
      drop: (item: Task) => changeTaskStatus(item, status),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div ref={drop} className={classNames(st.root, st[status])}>
      <div className={st.top}>
        <div className={st.circle}></div>
        <h3>{statusTitle[status]}</h3>
        <div className={st.count}>{list.length}</div>
      </div>
      <div className={st.body}>
        {list.map((elem) => (
          <TaskItem task={elem} key={elem.id} />
        ))}
        {isOver && (
          <Skeleton borderRadius={"10px"} width={"100%"} height={"170px"} />
        )}
      </div>
    </div>
  );
}
