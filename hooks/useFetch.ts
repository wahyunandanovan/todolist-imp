import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface Props {
  module: string;
  params?: string;
  initialData?: undefined;
}

function useFetch({ module, params, initialData }: Props) {
  const query = useQuery({
    queryKey: [module, params],
    queryFn: () => api.get(`/${module}${params ? `?${params}` : ""}`),
    initialData: initialData,
    enabled: Boolean(module),
  });

  return {
    ...query,
    items: query.data?.data || [],
  };
}

export default useFetch;
