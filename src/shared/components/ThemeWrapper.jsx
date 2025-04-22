const ThemeWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e165c] to-[#3d2c91] text-white flex items-center justify-center px-4">
      {children}
    </div>
  );
};

export default ThemeWrapper;
