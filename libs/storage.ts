// 定义 StorageTodoItem 类型，这是每一个 Todo 项的数据类型
export type StorageTodoItem = {
    id: string,
    content: string,
    completed: boolean
}

// 定义一个存储项，这是所有 Todo 项的数组类型，即 StorageTodoItem[]，并指定存储项的键名
export const storageTodoItems = storage.defineItem<StorageTodoItem[]>("local:StorageTodoItems")