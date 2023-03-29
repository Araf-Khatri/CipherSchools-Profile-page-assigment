import Axios from "axios";
import { useState } from "react";

interface Error {
  statusCode: null | Number;
  message: String;
}


const useHttp = (url: string, method: String) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Error>({
    statusCode: null,
    message: "",
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
    } catch (err) {
      console.log(err);
    }
  };

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useHttp;
