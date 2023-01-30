import morgan from "morgan";
import Task from "../../../model/task";
import { dbConnect } from "../../../utils/mongoose";
import runMiddleware from "../../../utils/runMiddleware";

dbConnect();

export default async function async(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;
  const morgondev = morgan("dev");
  switch (method) {
    case "GET":
      try {
        const tasks = await Task.findById(id);
        if (!tasks) return res.status(404).json({ msg: "no id found" });
        await runMiddleware(req, res, morgondev);
        return res.status(200).json(tasks);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).json({ msg: "no id found" });
        await runMiddleware(req, res, morgondev);
        return res.status(204).json();
      } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updatedTask = await Task.findByIdAndUpdate(id, body);
        if (!updatedTask)
          return res.status(404).json({ msg: "unable to edit page" });
        res.status(200).json(updatedTask);
      } catch (error) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      res.status(500).json({ message: "This end point not exist" });
  }
}
