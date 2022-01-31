<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
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
      this.$router.push({ name: "404Resource", params: { resource: "event" } });
    }
  },
};
</script>

<style scoped></style>
