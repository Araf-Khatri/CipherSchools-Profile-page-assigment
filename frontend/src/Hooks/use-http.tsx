import Axios from "axios";
import { useState } from "react";

interface Error {
  statusCode: null | Number;
  message: String;
  error: Boolean;
}

interface ErrorResponse {
  status: Number;
  data: {
    message: "";
  };
}

const useHttp = (url: string, method: String) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Error>({
    statusCode: null,
    message: "",
    error: false,
  });
  const sendRequest = async (data: Object) => {
    try {
      setIsLoading(true);
      let responseData = null;
      if (method === "POST") {
        const response = await Axios.post(url, data);
        responseData = response.data;
      } else if (method === "GET") {
        const response = await Axios.get(url);
        responseData = response.data;
      }

      setIsLoading(false);
      return responseData;
    } catch (err: Object | unknown) {
      const response: ErrorResponse = err?.response;
      console.log(response);
      setError((error: Error) => ({
        ...error,
        statusCode: response.status,
        message: response.data.message,
        error: true,
      }));
      setIsLoading(false);
      setTimeout(() => {
        setError((error: Error) => ({
          ...error,
          statusCode: null,
          message: "",
          error: false,
        }));
      }, 3000);
    }
  };

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useHttp;
