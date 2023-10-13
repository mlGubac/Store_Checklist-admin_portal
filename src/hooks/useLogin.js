import { useState } from "react";
import ApiManager from "../api/ApiManager";
import {  useQuery, useMutation, useQueryClient  } from "react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {   
  return useMutation(
    (data) => {
      return ApiManager.post(`/auth/login`, data)
    }
  );
};

export const useChangePassword = () => {   
  return useMutation(
    (data) => {
      return ApiManager.post(`/auth/change_password`, data)
    }
  );
};