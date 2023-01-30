import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Task() {
  const { push, query } = useRouter();
  const [data, setData] = useState({});
  const getTask = async () => {
    const response = await fetch(`http://localhost:3000/api/tasks/${query.id}`);
    const data = await response.json();
    setData({ title: data.title, description: data.description });
  };
  useEffect(() => {
    if (query.id) {
      getTask();
    }
  }, [query.id]);
  const handleInput = (event) => {
    event.preventDefault();
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await push("/");
      alert("Task has been updated successfully");
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
            value={data.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <textarea
            name="description"
            className="form-control"
            id="description"
            rows="3"
            onChange={handleInput}
            required
            value={data.description}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Update Task
        </button>
      </form>
    </div>
  );
}

// export async function getStaticPaths() {
//   const response = await fetch("http://localhost:3000/api/tasks");
//   const data = await response.json();
//   const paths = data.map((user) => {
//     return {
//       params: { id: user._id.toString() },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getServerSideProps({ query: { id } }) {
//   const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
//   if (response.status == 200) {
//     const data = await response.json();
//     return {
//       props: {
//         task: data,
//       },
//     };
//   }
//   return {
//     props: {
//       error: {
//         statusCode: response.status,
//         statusText: "invalid Id",
//       },
//     },
//   };
// }
