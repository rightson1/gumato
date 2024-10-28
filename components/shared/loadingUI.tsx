export const LoadingUI = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <span className="loader"></span>
      <span>
        <h1 className="text-center text-2xl font-semibold text-primary">
          Loading...
        </h1>
      </span>
    </div>
  );
};
