<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  props: ["id"],
  data() {
    return {
      event: null,
    };
  },
  async created() {
    try {
      const response = await EventService.getEvent(this.id);
      this.event = response.data;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped></style>
