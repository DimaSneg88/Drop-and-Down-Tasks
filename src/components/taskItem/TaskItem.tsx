import classNames from "classnames";
import { dragTypes, priorityTitle, Task } from "../../types";
import st from "./TaskItem.module.scss";
import { useDrag } from "react-dnd";

type Props = { task: Task };

export default function TaskItem({ task }: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragTypes.DEFAULT,
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,

        cursor: "move",
      }}
      className={st.root}
    >
      <div className={st.top}>
        <div className={st.name}>{task.project}</div>
        <div className={st.circle}>...</div>
      </div>
      <div className={st.main}>
        <div className={st.text}>
          <h2>{task.name}</h2>
          <p>{task.discription}</p>
          <div className={st.badge}>
            {task.priority.map((elem, index) => {
              return (
                <div key={index} className={classNames(st.priority, st[elem])}>
                  {priorityTitle[elem]}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={st.footer}>
        <div className={st.info}>
          <div className={st.footers}>
            <p>{task.lead}</p>
          </div>
          <div className={st.footers}>
            <p>{task.deadline}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
