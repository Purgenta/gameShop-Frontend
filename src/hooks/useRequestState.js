import { useState } from "react";
const useRequestState = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  return {
    data,
    setData,
    error,
    setError,
    loading,
    setIsLoading,
  };
};
export default useRequestState;
