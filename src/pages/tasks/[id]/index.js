import { useRouter } from "next/router";
import async from "../../api/tasks";
export default function Task() {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { push, query } = useRouter();
  const deleteTask = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>TaskDetails</h1>
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

// export async function getStaticProps(context) {
//   const { params: id } = context;
//   const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
//   const task = await response.json();
//   console.log("task", task);
//   return {
//     props: {
//       task,
//     },
//   };
// }
