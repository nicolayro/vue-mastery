import { createStore } from "vuex";
import EventService from "../services/EventService";

export default createStore({
  state: {
    user: "Nicolay R",
    flashMessage: "",
    events: [],
    event: null,
    totalEvents: 0,
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, payload) {
      state.events = payload.events;
      state.totalEvents = payload.totalEvents;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    async createEvent({ commit }, event) {
      await EventService.postEvent(event);
      commit("ADD_EVENT", event);
    },
    async fetchEvents({ commit }, page) {
      const response = await EventService.getEvents(2, page);
      commit("SET_EVENTS", {
        events: response.data,
        totalEvents: response.headers["x-total-count"],
      });
    },
    async fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find((event) => event.id === id);
      if (existingEvent) {
        commit("SET_EVENT", existingEvent);
      } else {
        const response = await EventService.getEvent(id);
        commit("SET_EVENT", response.data);
      }
    },
  },
  modules: {},
});
