import { useState } from "react";
import SedarApi from "../api/SedarApi";
import { useQuery } from "react-query";
import axios from "axios";

export const useSedarGet = () => {
  const fetchData = async () => {
    return await axios.get(`http://rdfsedar.com/api/data/employees`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 9|u27KMjj3ogv0hUR8MMskyNmhDJ9Q8IwUJRg8KAZ4`,
      },
    });
  };

  const { status, isLoading, isSuccess, isError, data, error } = useQuery(
    ["sedarData"],
    fetchData,
    {
      retry: false,
      refetchOnWindowFocus: false,
      select: (response) => response?.data?.data,
    }
  );
  return {
    status,
    isLoading,
    isSuccess,
    isError,
    data,
    error,
  };
};
