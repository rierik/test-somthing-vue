<script setup>
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { onMounted, ref } from 'vue';

// // Passing elements directly
// const container = document.querySelector('#container');
// const calendar = new Calendar(container);

// // Using CSS selectors
// const calendar = new Calendar('#container');

const container = ref(null);

onMounted(() => {
  const calendar = new Calendar(container.value, {
    defaultView: 'month',
    isReadOnly: true,
    timezone: {
      // Timezone options
    },
    theme: {
      // Theme options
    },
    template: {
      // Template options
    },
  });

  calendar.createEvents([
    {
      id: 'event1',
      calendarId: 'cal1',
      title: 'Weekly Meeting',
      start: '2024-10-30T09:00:00',
      end: '2024-10-30T10:00:00',
    },
    {
      id: 'event2',
      calendarId: 'cal2',
      title: 'Lunch with Teammates',
      start: '2024-10-30',
      end: '2024-10-31',
    },
  ]);
});
</script>

<template>
  <div ref="container"></div>
</template>

<style scoped>
div {
  height: 100vh;
}
</style>
