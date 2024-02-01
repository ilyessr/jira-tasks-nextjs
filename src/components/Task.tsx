import React from "react";
import StatusTag from "./StatusTag";

interface TaskProps {
  id: string;
  summary: string;
  status: string;
  createdDate: string;
}

const Task: React.FC<TaskProps> = ({ id, summary, status, createdDate }) => {
    const date:string = new Date(createdDate).toLocaleDateString("fr", { day : "numeric", month: "long", year: "numeric"})
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4 mx-auto max-w-2xl ">
      <div className="flex flex-col sm:flex-row justify-between">
        <h2 className="text-lg font-semibold mb-2 mr-3">{summary} #{id}</h2>
        <StatusTag status={status} />
      </div>
      <p className="text-gray-700"></p>
      <div className="mt-2">
        <p className="text-sm text-gray-600">Créée le {date}</p>
      </div>
    </div>
  );
};

export default Task;
