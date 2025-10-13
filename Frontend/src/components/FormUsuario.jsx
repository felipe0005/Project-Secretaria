export default function FormUsuario({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  editingUser,
}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg transform animate-modalEnter"
      >
        {/* Título */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-2">
            {editingUser ? "Editar Usuario" : "Crear Usuario"}
          </h3>
          <div className="h-1 w-16 bg-sky-500 mx-auto rounded-full"></div>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition w-full"
            required
          />
          <input
            type="text"
            placeholder="Materia"
            value={formData.materia}
            onChange={(e) =>
              setFormData({ ...formData, materia: e.target.value })
            }
            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition w-full"
            required
          />
          <input
            type="text"
            placeholder="Horario"
            value={formData.horario}
            onChange={(e) =>
              setFormData({ ...formData, horario: e.target.value })
            }
            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition w-full col-span-2 sm:col-span-1"
            required
          />
          <select
            value={formData.estado}
            onChange={(e) =>
              setFormData({ ...formData, estado: e.target.value })
            }
            className="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition w-full col-span-2"
            required
          >
            <option value="">Estado</option>
            <option value="titular">Titular</option>
            <option value="suplente">Suplente</option>
            <option value="temporal">Temporal</option>
          </select>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold shadow-sm transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-md transition"
          >
            {editingUser ? "Guardar Cambios" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}
