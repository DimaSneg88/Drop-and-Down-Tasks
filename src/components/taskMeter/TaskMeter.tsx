import st from "./TaskMeter.module.scss";

type Props = { completeCount: number; allCount: number };

export default function TaskMeter({ completeCount, allCount }: Props) {
  const percent = (completeCount * 100) / allCount;

  return (
    <div className={st.root}>
      <div className={st.top}>
        <span>Task Meter</span>
        <div>
          <span className={st.blue}>{completeCount}</span>
          <span>/{allCount}</span>
        </div>
      </div>
      <div className={st.line}>
        <div
          className={st.result}
          style={{ transform: `translateX(calc((100% - ${percent}%) * -1))` }}
        ></div>
      </div>
    </div>
  );
}
