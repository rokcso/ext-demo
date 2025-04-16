import { storageTodoItems } from "@/libs/storage";

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  if (!browser.action) {
    console.log('action not supported');
    return;
  }

  browser.action.onClicked.addListener(async (tab) => {
    console.log("wwww")
    console.log('action clicked', tab);

    browser.scripting.executeScript({
      target: { tabId: tab.id! },
      files: ['/dynamic.js']
    });
  });

  storageTodoItems.watch(async (value = []) => {
    console.log('todoItems', value);
    const { uncompletedCount, completedCount } = value.reduce((acc, item) => {
      item.isCompleted ? acc.completedCount++ : acc.uncompletedCount++;
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
  });
});


