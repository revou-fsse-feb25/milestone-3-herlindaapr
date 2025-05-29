export default function LoadingSpinner() {
    return (
      <div className="flex flex-col justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-200"></div>
        <p className="text-teal-300 text-lg py-2">Loading data...</p>
      </div>
    );
  }