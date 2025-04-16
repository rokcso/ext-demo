import { QueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { storageTodoItems } from './storage';

export const queryClient = new QueryClient();

export const useTodoItemsQuery = () => useQuery({
    queryKey: ['todoItems', 'list'],
    queryFn: async () => {
        const todoItems = await storageTodoItems.getValue() || [];
        return todoItems;
    }
});

export const useToggleTodoItemMutation = () => useMutation({
    mutationFn: async (id: string) => {
        const todoItems = await storageTodoItems.getValue() || [];
        await storageTodoItems.setValue(todoItems.map(item => item.id === id ? { ...item, completed: !item.completed} : item));
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todoItems', 'list'] });
    }
})

// 删除指定 todoItem
export const useDeleteTodoItemMutation = () => useMutation({
    mutationFn: async (id: string) => {
        const todoItems = await storageTodoItems.getValue() || [];
        await storageTodoItems.setValue(todoItems.filter(item => item.id !== id));
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todoItems', 'list'] });
    }
})