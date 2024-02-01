import React, { useEffect, useState } from "react";
import Task from "./Task";

interface TaskData {
  id: string;
  fields: {
    summary: string;
    created: string;
    status: { name: string };
  };
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) {
          throw new Error("Server response is not OK");
        }
        const data = await res.json();
        if (!data.issues) {
          throw new Error("Received data is not in the expected format");
        }
        setTasks(data.issues);
      } catch (error: any) {
        console.error("Error fetching Jira tasks: ", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Mes Tâches Jira</h1>
      {isLoading ? (
        <p className="text-gray-600">Chargement en cours...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div>
          <ul className="list-disc ml-4">
            {tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                summary={task.fields.summary}
                status={task.fields.status.name}
                createdDate={task.fields.created}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskList;
