import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  // Hooks para la navegación
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="text-red-500 text-6xl">⚠️</div>
      <h1 className="text-2xl font-bold text-gray-800 mt-4">Oops, algo salió mal</h1>
      <p className="text-gray-600 mt-2">No pudimos cargar los datos. Intenta nuevamente más tarde.</p>
      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        onClick={() => navigate("/")}
      >
        Volver al inicio
      </button>
    </div>
  )
}

export default ErrorPage;