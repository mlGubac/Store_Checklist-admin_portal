import { useState } from "react";
import ApiManager from "../api/ApiManager";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useRoleGet = () => {
  const [params, setParams] = useState({
    status: "active",
    pagination: 1,
    per_page: 10,
    search: null,
    page: null,
  });

  const fetchData = async () => {
    return await ApiManager.get(`/role`, { params });
  };

  const onArchiveDeactivated = () => {
    setParams((currentValue) => ({
      ...currentValue,
      status: "deactivated",
    }));
  };

  const onArchiveActive = () => {
    setParams((currentValue) => ({
      ...currentValue,
      status: "active",
    }));
  };

  const onSearchData = (search) => {
    setParams((currentValue) => ({
      ...currentValue,
      page: 1,
      search: search,
    }));
  };

  const onPageChange = (_, page) => {
    setParams((currentValue) => ({
      ...currentValue,
      page: page + 1,
    }));
  };

  const onRowChange = (rows) => {
    setParams((currentValue) => ({
      ...currentValue,
      page: 1,
      per_page: rows.target.value,
    }));
  };

  const { status, isLoading, isSuccess, isError, data, error } = useQuery(
    [
      "roleData",
      params.status,
      params.search,
      params.pagination,
      params.page,
      params.per_page,
    ],
    fetchData,
    {
      retry: false,
      refetchOnWindowFocus: false,
      select: (response) => response.data,
    }
  );
  return {
    status,
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    onSearchData,
    onPageChange,
    onRowChange,
    onArchiveDeactivated,
    onArchiveActive,
  };
};

export const useRoleCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return ApiManager.post(`/role`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roleData"] });
    },
  });
};

export const useRoleUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return ApiManager.put(`/role/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roleData"] });
    },
  });
};

export const useRoleArchive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return ApiManager.put(`/role-archive-restore/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roleData"] });
    },
  });
};
