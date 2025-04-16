import { storageTodoItems } from "@/libs/storage";

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  storageTodoItems.watch(async (value = []) => {
    console.log('todoItems', value);
    const { uncompletedCount, completedCount } = value.reduce((acc, item) => {
      item.completed ? acc.completedCount++ : acc.uncompletedCount++;
      return acc;
    }, {
      uncompletedCount: 0,
      completedCount: 0
    });
    const message = `Completed ${completedCount} tasks, ${uncompletedCount} tasks left.`;

    browser.notifications.create({
      type: 'basic',
      iconUrl: '/icon/32.png',
      title: 'Todo updated',
      message: message
    })
  })
});
