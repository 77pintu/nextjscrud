import { useState } from "react";
import { useRouter } from "next/router";
export default function NewTask() {
  const [data, setData] = useState({});
  const { push } = useRouter();
  const handleInput = (event) => {
    event.preventDefault();
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1>NewTask</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="title"
            placeholder="awesome information"
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            className="form-control"
            id="description"
            rows="3"
            onChange={handleInput}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Create task
        </button>
      </form>
    </div>
  );
}
