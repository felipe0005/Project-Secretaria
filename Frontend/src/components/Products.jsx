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
    <div>
      <section>
        <Boton text="Agregar" onClick={handleCreate} />

        {loading ? (
          <p className="text-center text-gray-500 py-4">Cargando usuarios...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr className="font-bold">
                <th className="p-3 text-sm text-left">#</th>
                <th className="p-3 text-sm text-left">NOMBRE</th>
                <th className="p-3 text-sm text-left">MATERIA</th>
                <th className="p-3 text-sm text-left">ESTADO</th>
                <th className="p-3 text-sm text-left">HORARIO</th>
                <th className="p-3 text-sm text-left">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr
                  key={usuario.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 text-sm">{usuario.nombre}</td>
                  <td className="px-6 py-4 text-sm">{usuario.materia}</td>
                  <td className="px-6 py-4 text-sm">
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
                  <td className="px-6 py-4 text-sm">{usuario.horario}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(usuario)}
                      className="font-bold bg-yellow-500 border-2 border-yellow-500 text-white px-3 py-1 rounded hover:bg-white hover:text-yellow-500 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(usuario.id)}
                      className="font-bold bg-red-500 border-2 border-red-500 text-white px-3 py-1 rounded hover:bg-white hover:text-red-500 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
