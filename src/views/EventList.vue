<template>
  <h1>Events for good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagnation">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
      eventsPerPage: 2,
      totalEvents: 0,
    };
  },
  async beforeRouteEnter(routeTo, routeFrom, next) {
    try {
      const response = await EventService.getEvents(
        2,
        parseInt(routeTo.query.page) || 1
      );
      next((comp) => {
        comp.events = response.data;
        comp.totalEvents = response.headers["x-total-count"];
      });
    } catch (err) {
      console.log(err);
    }
  },
  async beforeRouteUpdate(routeTo) {
    try {
      const response = await EventService.getEvents(
        2,
        parseInt(routeTo.query.page) || 1
      );
      this.events = response.data;
      this.totalEvents = response.headers["x-total-count"];
      return;
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalEvents / 2);
      return this.page < totalPages;
    },
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagnation {
  display: flex;
  width: 290px;
}

.pagnation a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
