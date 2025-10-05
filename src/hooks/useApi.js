// src/hooks/useApi.js
import { useState } from "react";
import toast from "react-hot-toast";
import handleError from "../utils/handleError";

export default function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...params);
      setData(result);
      toast.success("Success!");
      return result;
    } catch (err) {
      const message = handleError(err);
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
}
