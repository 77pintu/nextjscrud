import Head from "next/head";
import Image from "next/image";
import task from "../model/task";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
export default function Home({ tasks }) {
  const router = useRouter();

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!tasks) return <h1>Loading.........</h1>;

  return (
    <div className="container">
      <Link href="/tasks/new" className="btn btn-sm btn-secondary my-5 ">
        Create Task
      </Link>
      <div className="row">
        {tasks.map((task) => {
          return (
            <div className="col-sm-12 col-md-6 col-lg-3 " key={task.id}>
              <div className="card my-2" style={{ width: "16rem" }}>
                <Image
                  src="/images/work.jpg"
                  height="200"
                  width={200}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  <button
                    onClick={() => deleteTask(task._id)}
                    type="button"
                    className="btn btn-info mx-4"
                  >
                    Delete
                  </button>
                  <button type="button" className="btn btn-warning">
                    <Link href={`/${task._id}`}>Edit</Link>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/tasks");
  const data = await response.json();
  return {
    props: { tasks: data },
  };
}
