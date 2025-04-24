export function Spinner() {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        height: "calc(100vh - 200px)",
      }}
    >
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-indigo-600"></div>
    </div>
  );
}
