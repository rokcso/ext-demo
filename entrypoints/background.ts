import { storageTodoItems } from "@/libs/storage";

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  storageTodoItems.watch(async (value) => {
    console.log('todoItems', value);
  })
});
