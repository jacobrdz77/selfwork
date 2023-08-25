import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useStuff = () => {
  const {
    data: stuff,
    isLoading,
    status,
  } = useQuery({
    queryKey: [""],
    queryFn: () => {},
    onSuccess: () => {},
  });
  return { stuff, isLoading, status };
};

type StuffData = {};

export const useCreateStuff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (stuffData: StuffData) => {
      try {
        const response = await fetch(`/api/stuffs`, {
          method: "POST",
          body: JSON.stringify({
            stuff: {
              ...stuffData,
            },
          }),
        });

        if (!response.ok) {
          throw Error("Error happend!: " + response.status.toLocaleString());
        }
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["stuffs"],
      });
    },
  });
};

export const useDeleteStuff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (stuffId: string) => {
      try {
        const response = await fetch(`/api/stuffs/${stuffId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return await response.json();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["stuffs"] });
    },
  });
};

export const useUpdatestuff = (stuffId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ stuffData }: { stuffData: StuffData }) => {
      try {
        const response = await fetch(`/api/stuffs/${stuffId}`, {
          method: "PUT",
          body: JSON.stringify({
            stuffData: {
              ...stuffData,
            },
          }),
        });

        if (!response.ok) {
          throw Error("Error happend!: " + response.status.toLocaleString());
        }
        return await response.json();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["stuffs"] });
    },
  });
};
