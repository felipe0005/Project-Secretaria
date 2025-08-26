import Boton from "./boton";
import { useEffect, useState } from "react";

export default function Product() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/usuarios") 
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error al traer usuarios:", err));
  }, []);

  return (
    <div>
      <section>
        <Boton text={"agregar"} />
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr className="font-bold">
              <th className="p-3 text-sm font-semibold text-left">#</th>
              <th className="p-3 text-sm font-semibold text-left">NOMBRE</th>
              <th className="p-3 text-sm font-semibold text-left">MATERIA</th>
              <th className="p-3 text-sm font-semibold text-left">ESTADO</th>
              <th className="p-3 text-sm font-semibold text-left">HORARIO</th>
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
                  {usuario.estado}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {usuario.horario}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
