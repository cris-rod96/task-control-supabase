import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiDeleteBinLine, RiEditLine } from "react-icons/ri";
const { VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY } = import.meta.env;

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    priority: "",
  });
  const client = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY);

  const fetchTasks = async () => {
    const { data } = await client.from("tasks").select();
    setTasks(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const saveTask = async () => {
    const response = await client.from("tasks").insert(task);
    if (response.status === 201) fetchTasks();
    else alert("Error: ", response.statusText);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="w-2/3 mx-auto py-10 flex flex-col space-y-5">
      <h1 className="text-5xl">Welcome to Task Control</h1>

      {/* Container */}
      <div className="flex flex-col">
        {/* Inputs */}
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex justify-between gap-3">
            <input
              type="text"
              name="title"
              value={task.title}
              className="w-full px-2 py-3 outline-none bg-neutral-800 text-white"
              onChange={handleChange}
            />
            <select
              name="priority"
              className="w-32 outline-none bg-neutral-800 text-white"
              onChange={handleChange}
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Urgente">Urgente</option>
            </select>
          </div>
          <button
            type="button"
            onClick={saveTask}
            className="bg-teal-700 text-gray-300 py-3 uppercase font-bold hover:bg-teal-800 hover:text-white transition-colors duration-300"
          >
            Guardar
          </button>
        </div>

        {/* Tasks Container */}
        <div className="border border-gray-500/30 rounded-lg">
          {/* Tasks */}
          <div className="flex flex-col">
            {/* Task */}
            {tasks && tasks.length > 0 ? (
              tasks.map((currentTask) => (
                <div
                  className="px-10 py-4 border-b border-gray-500/30 flex justify-between items-center"
                  key={currentTask.id}
                >
                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="" id="" className="w-5 h-5" />
                    <span className="text-lg tracking-wide font-light">
                      {currentTask.title}
                    </span>
                  </div>

                  <div className="[&>button]:border [&>button]:border-gray-500/30 [&>button]:text-gray-300 [&>button]:rounded-md [&>button]:cursor-pointer [&>button]:px-5 [&>button]:py-3 [&>button]:transition-colors [&>button]:duration-300 flex items-center gap-2">
                    <button className="hover:text-white bg-yellow-500">
                      <RiEditLine size={20} />
                    </button>
                    <button className="bg-red-600 hover:text-white">
                      <RiDeleteBinLine size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1>Hola</h1>
            )}
          </div>

          {/* Footer */}
          <div className="grid grid-cols-3 px-10 py-5">
            {/* Nums Tasks */}
            <div className="flex items-center gap-2 w-full">
              <span>4</span>
              <span>Tasks</span>
            </div>

            {/* Filtered Buttons */}
            <div className="flex items-center justify-center gap-2 w-full [&>button]:border [&>button]:border-gray-500/30 [&>button]:p-3 [&>button]:text-gray-500 [&>button]:rounded-lg [&>button]:transition-all [&>button]:duration-300">
              <button className="hover:bg-gray-500/5 hover:text-white">
                Completadas
              </button>
              <button className="hover:bg-gray-500/5 hover:text-white">
                Eliminadas
              </button>
              <button className="hover:bg-gray-500/5 hover:text-white">
                Pendientes
              </button>
            </div>

            {/* Delete All */}
            <div className="w-full flex items-center justify-end">
              <button className="flex items-center gap-2 border border-gray-500/30 rounded-lg p-3 text-gray-500 hover:text-white hover:bg-gray-500/10 transition-all duration-300">
                <RiDeleteBin6Line />
                <span>Borrar todo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
