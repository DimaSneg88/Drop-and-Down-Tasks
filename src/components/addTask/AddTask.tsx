import { useFormik } from "formik";
import st from "./AddTask.module.scss";
import * as Yup from "yup";
import { MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Priority, Status, Task } from "../../types";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
import classNames from "classnames";
type Props = { addTask: (item: Task) => void };

type initialValuesT = {
  name: string;
  discription: string;
  project: string;
  lead: string;
  deadline: Dayjs | null;
  priority: Priority;
};

export default function AddTask({ addTask }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const initialValues: initialValuesT = {
    name: "",
    discription: "",
    project: "",
    lead: "",
    deadline: null,
    priority: Priority.Low,
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(50, "name is too long").required("name is required"),
    discription: Yup.string()
      .min(20, "min 20 symbols")
      .max(200, "discription is too long")
      .required("discription is required"),
    project: Yup.string()
      .max(20, "project is too long")
      .required("project is required"),
    lead: Yup.string().max(30, "lead is too long"),
    priority: Yup.string().required("priority is required"),
  });

  function handleSubmit(
    values: initialValuesT,
    { resetForm }: { resetForm: () => void }
  ) {
    console.log(values);
    addTask({
      ...values,
      id: Date.now(),
      status: Status.Todo,
      deadline: values.deadline ? values.deadline.format("DD.MM.YYYY") : "",
      priority: [values.priority],
    });
    setOpen(false);
    resetForm();
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={st.root}>
      <button className={st.add} onClick={() => setOpen(true)}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0526 5.05263H6.94737V0.947368C6.94737 0.429474 6.51789 0 6 0C5.48211 0 5.05263 0.429474 5.05263 0.947368V5.05263H0.947368C0.429474 5.05263 0 5.48211 0 6C0 6.51789 0.429474 6.94737 0.947368 6.94737H5.05263V11.0526C5.05263 11.5705 5.48211 12 6 12C6.51789 12 6.94737 11.5705 6.94737 11.0526V6.94737H11.0526C11.5705 6.94737 12 6.51789 12 6C12 5.48211 11.5705 5.05263 11.0526 5.05263Z"
            fill="white"
          />
        </svg>
        <span>Add Task</span>
      </button>

      <div className={open ? classNames(st.modal, st.modalActive) : st.modal}>
        <div className={st.container}>
          <div className={st.top}>
            <button className={st.close} onClick={() => setOpen(false)}>
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.69646 1.28595L5.47106 4.51135L2.24566 1.28595C1.83876 0.879058 1.16391 0.879058 0.757014 1.28595C0.350117 1.69285 0.350117 2.3677 0.757014 2.7746L3.98241 6L0.757014 9.2254C0.350117 9.6323 0.350117 10.3071 0.757014 10.714C1.16391 11.1209 1.83876 11.1209 2.24566 10.714L5.47106 7.48865L8.69646 10.714C9.10335 11.1209 9.77821 11.1209 10.1851 10.714C10.592 10.3071 10.592 9.6323 10.1851 9.2254L6.9597 6L10.1851 2.7746C10.592 2.3677 10.592 1.69285 10.1851 1.28595C9.77821 0.879059 9.10335 0.879059 8.69646 1.28595Z"
                  fill="#0D062D"
                />
              </svg>
            </button>
          </div>
          <div className={st.header}>
            <h2>Add Task</h2>
            <p className={st.date}>11.12.2024</p>
          </div>
          <form className={st.form} onSubmit={formik.handleSubmit}>
            <div className={st.field}>
              <label className={st.label}>Name the task</label>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>
            <div className={st.field}>
              <label className={st.label}>Description task</label>
              <TextField
                fullWidth
                id="discription"
                name="discription"
                label="Discription"
                value={formik.values.discription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.discription &&
                  Boolean(formik.errors.discription)
                }
                helperText={
                  formik.touched.discription && formik.errors.discription
                }
              />
            </div>
            <div className={st.row}>
              <div className={st.field}>
                <label className={st.label}>Project name</label>
                <TextField
                  sx={{ width: "240px" }}
                  id="project"
                  name="project"
                  label="Project"
                  value={formik.values.project}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.project && Boolean(formik.errors.project)
                  }
                  helperText={formik.touched.project && formik.errors.project}
                />
              </div>
              <div className={st.field}>
                <label className={st.label}>Lead</label>
                <TextField
                  sx={{ width: "240px" }}
                  id="lead"
                  name="lead"
                  label="Name Surname"
                  value={formik.values.lead}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lead && Boolean(formik.errors.lead)}
                  helperText={formik.touched.lead && formik.errors.lead}
                />
              </div>
            </div>
            <div className={st.row}>
              <div className={st.field}>
                <label className={st.label}>Task deadline</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "240px" }}
                    name="deadline"
                    label="Deadline"
                    value={formik.values.deadline}
                    onChange={(value) =>
                      formik.setFieldValue("deadline", value, true)
                    }
                  />
                </LocalizationProvider>
              </div>
              <div className={st.field}>
                <label className={st.label}>Task priority</label>
                <Select
                  sx={{ width: "240px" }}
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  id="priority"
                  label="Priority"
                >
                  <MenuItem value={Priority.Low}>Low</MenuItem>
                  <MenuItem value={Priority.InProgress}>InProgress</MenuItem>
                  <MenuItem value={Priority.High}>High</MenuItem>
                  <MenuItem value={Priority.Completed}>Completed</MenuItem>
                </Select>
              </div>
            </div>
            <div className={st.buttons}>
              <button type="submit" className={st.btn}>
                Save
              </button>
              <button
                type="button"
                className={st.cancel}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
