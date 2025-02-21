const Loading = () =>{
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-600">Cargando, por favor espera...</p>
    </div>
  );
}

export default Loading;