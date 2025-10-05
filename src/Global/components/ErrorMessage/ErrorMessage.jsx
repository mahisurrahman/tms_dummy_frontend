// src/components/ErrorMessage.jsx
export default function ErrorMessage({ message }) {
  return (
    <div className="text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
      {message}
    </div>
  );
}
