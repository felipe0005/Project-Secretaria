import Boton from "./boton";
import { useEffect, useState } from "react";

export default function Product() {
  const [usuarios, setUsuarios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setformData] = useState({
    nombre: "",
    materia: "",
    estado: "",
    horario: "",
  });

  const fetchUsuarios = () => {
    fetch("http://localhost:3000/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCreate = () => {
    setEditingUser(null);
    setformData({
      nombre: "",
      materia: "",
      estado: "",
      horario: "",
    });
    setShowForm(true);
  };

  const handleEdit = (usuario) => {
    setEditingUser(usuario);
    setformData({ ...usuario });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este usuario?")) return;
    fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" })
      .then(() => fetchUsuarios())
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingUser ? "PUT" : "POST";
    const url = editingUser
      ? `http://localhost:3000/api/usuarios/${editingUser.id}`
      : "http://localhost:3000/api/usuarios";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        fetchUsuarios();
        setShowForm(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <section>
        <Boton text={"Agregar"} onClick={handleCreate} />
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr className="font-bold">
              <th className="p-3 text-sm font-semibold text-left">#</th>
              <th className="p-3 text-sm font-semibold text-left">NOMBRE</th>
              <th className="p-3 text-sm font-semibold text-left">MATERIA</th>
              <th className="p-3 text-sm font-semibold text-left">ESTADO</th>
              <th className="p-3 text-sm font-semibold text-left">HORARIO</th>
              <th className="p-3 text-sm font-semibold text-left">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr
                key={usuario.id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {usuario.nombre}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {usuario.materia}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      usuario.estado === "titular"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {usuario.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {usuario.horario}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(usuario)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(usuario.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg"
          >
            <h3 className="text-xl font-bold mb-4">
              {editingUser ? "Editar Usuario" : "Crear Usuario"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setformData({ ...formData, nombre: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Materia"
                value={formData.materia}
                onChange={(e) =>
                  setformData({ ...formData, materia: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Horario"
                value={formData.horario}
                onChange={(e) =>
                  setformData({ ...formData, horario: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
                required
              />
              <select
                value={formData.estado}
                onChange={(e) =>
                  setformData({ ...formData, estado: e.target.value })
                }
                className="border px-3 py-2 rounded w-full col-span-2"
                required
              >
                <option value="">Estado</option>
                <option value="titular">Titular</option>
                <option value="suplente">Suplente</option>
                <option value="temporal">Temporal</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {editingUser ? "Guardar Cambios" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
