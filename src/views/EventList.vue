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
import store from "../store";

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch("fetchEvents", parseInt(routeTo.query.page) || 1)
      .catch((err) => {
        this.$router.push({
          name: "ErrorDisplay",
          params: { error: err },
        });
      });
    next();
  },
  beforeRouteUpdate(routeTo) {
    this.$store
      .dispatch("fetchEvents", parseInt(routeTo.query.page) || 1)
      .catch((err) => {
        this.$router.push({
          name: "ErrorDisplay",
          params: { error: err },
        });
      });
    return;
  },
  computed: {
    events() {
      return this.$store.state.events;
    },
    hasNextPage() {
      var totalPages = Math.ceil(this.$store.state.totalEvents / 2);
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
