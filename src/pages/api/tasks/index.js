import morgan from "morgan";
import Task from "../../../model/task";
import { dbConnect } from "../../../utils/mongoose";
import runMiddleware from "../../../utils/runMiddleware";

dbConnect();
export default async function async(req, res) {
  const { method, body } = req;
  const morgondev = morgan("dev");
  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find();
        await runMiddleware(req, res, morgondev);
        return res.status(200).json(tasks);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: err.message });
      }
    case "POST":
      try {
        const newTask = new Task(body);
        const savedTask = await newTask.save();
        await runMiddleware(req, res, morgondev);
        return res.status(200).json(savedTask);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: err.message });
      }
    default:
      res.status(500).json({ message: "This end point not exist" });
  }
}
