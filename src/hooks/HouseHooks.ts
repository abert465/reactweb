import axios, { AxiosError, AxiosResponse } from "axios";
import config from "../config";
import { useMutation, useQuery, useQueryClient } from "react-query";
import{ House } from "../types/house";
import { useNavigate } from "react-router-dom";
import Problem from "../types/problem";

const useFetchHouses = () => {
    return useQuery<House[], AxiosError>("houses", () =>
      axios.get(`${config.baseApiUrl}/houses`).then((resp) => resp.data)
    );
};

const useFetchHouse = (id: number) => {
  return useQuery<House, AxiosError>(["houses", id], () =>
  axios.get(`${config.baseApiUrl}/house/${id}`).then((resp) => resp.data));
}

const useAddHouse = () => 
{
  const queryClient = useQueryClient();
  const nav = useNavigate();
  
  return useMutation<AxiosResponse, AxiosError<Problem>, House>(
    (h) => axios.post(`${config.baseApiUrl}/houses`, h),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("houses");
        nav("/")
      }, 
    }
  );
};

const useUpdateHouse = () => 
{
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation<AxiosResponse, AxiosError<Problem>, House>(
    (h) => axios.put(`${config.baseApiUrl}/houses`, h),
    {
      onSuccess: (_, house) => {
        queryClient.invalidateQueries("houses");
        nav(`/house/${house.id}`);
      }, 
    }
  );
};

const useDeleteHouse = () => 
{
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation<AxiosResponse, AxiosError, House>(
    (h) => axios.delete(`${config.baseApiUrl}/houses/${h.id}`),
    {
      onSuccess: (_, house) => {
        queryClient.invalidateQueries("houses");
        nav(`/house/${house.id}`);
      }, 
    }
  );
};

export {useFetchHouses, useFetchHouse, useAddHouse, useUpdateHouse, useDeleteHouse};