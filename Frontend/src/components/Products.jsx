import { useEffect, useState } from "react";
import Boton from "./Boton";
import FormUsuario from "./FormUsuario";
import ModalEliminar from "./ModalEliminar";

export default function Product() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    materia: "",
    estado: "",
    horario: "",
  });

  const fetchUsuarios = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({ nombre: "", materia: "", estado: "", horario: "" });
    setShowForm(true);
  };

  const handleEdit = (usuario) => {
    setEditingUser(usuario);
    setFormData({ ...usuario });
    setShowForm(true);
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
      .catch(console.error);
  };

  const handleDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);
  const confirmDelete = () => {
    fetch(`http://localhost:3000/api/usuarios/${deleteId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchUsuarios();
        setDeleteId(null);
      })
      .catch(console.error);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <section className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-sky-700">
            Gestión de Usuarios
          </h2>
          <Boton text="Agregar Usuario" onClick={handleCreate} />
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-6 text-lg animate-pulse">
            Cargando usuarios...
          </p>
        ) : usuarios.length === 0 ? (
          <p className="text-center text-gray-400 py-6 italic">
            No hay usuarios registrados.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-sky-500 to-sky-600 text-white">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Nombre</th>
                  <th className="p-3 text-left">Materia</th>
                  <th className="p-3 text-left">Estado</th>
                  <th className="p-3 text-left">Horario</th>
                  <th className="p-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {usuarios.map((usuario, index) => (
                  <tr
                    key={usuario.id}
                    className="hover:bg-sky-50 transition duration-200"
                  >
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 capitalize">{usuario.nombre}</td>
                    <td className="px-6 py-4">{usuario.materia}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          usuario.estado === "titular"
                            ? "bg-green-100 text-green-800"
                            : usuario.estado === "suplente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {usuario.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">{usuario.horario}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(usuario)}
                        className="px-4 py-1.5 rounded-lg text-white font-semibold bg-yellow-500 hover:bg-yellow-600 shadow-sm transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(usuario.id)}
                        className="px-4 py-1.5 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 shadow-sm transition"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showForm && (
        <FormUsuario
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          editingUser={editingUser}
        />
      )}

      {deleteId && (
        <ModalEliminar onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </div>
  );
}
