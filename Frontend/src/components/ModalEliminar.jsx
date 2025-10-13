export default function ModalEliminar({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm animate-fadeIn z-50">
      <div className="bg-white rounded-3xl p-8 shadow-2xl w-96 transform animate-modalEnter">
        {/* Ícono de advertencia */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
          ¿Eliminar este usuario?
        </h2>

        {/* Texto descriptivo */}
        <p className="text-center text-gray-600 mb-6">
          Esta acción no se puede deshacer. ¿Estás seguro de continuar?
        </p>

        {/* Botones */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold shadow-sm transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
