export default function FormUsuario({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  editingUser,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg transform transition-transform duration-300 scale-100"
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
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Materia"
            value={formData.materia}
            onChange={(e) =>
              setFormData({ ...formData, materia: e.target.value })
            }
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Horario"
            value={formData.horario}
            onChange={(e) =>
              setFormData({ ...formData, horario: e.target.value })
            }
            className="border px-3 py-2 rounded w-full"
            required
          />
          <select
            value={formData.estado}
            onChange={(e) =>
              setFormData({ ...formData, estado: e.target.value })
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
            onClick={onCancel}
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
  );
}
