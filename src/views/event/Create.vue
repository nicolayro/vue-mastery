<template>
  <h1>Create an event</h1>

  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <BaseSelect
        :options="categories"
        v-model="event.category"
        label="Select a category: "
      />

      <h3>Name & describe your event</h3>

      <BaseInput
        v-model="event.title"
        label="Title"
        type="text"
        error="There is not title"
      />

      <BaseInput v-model="event.description" label="Description" type="text" />

      <h3>Where is your event?</h3>

      <BaseInput v-model="event.location" label="Location" type="text" />

      <h3>When is your event?</h3>
      <label>Date</label>
      <input v-model="event.date" type="text" placeholder="Date" />

      <label>Time</label>
      <input v-model="event.time" type="text" placeholder="Time" />

      <BaseCheckbox v-model="event.extras.catering" label="Catering" />
      <BaseCheckbox v-model="event.extras.music" label="Live Music" />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
// import BaseInput from "../../components/BaseInput.vue";
// import BaseSelect from "../../components/BaseSelect.vue";

export default {
  // components: {
  //   BaseInput,
  //   BaseSelect,
  // },
  data() {
    return {
      categories: [
        "sustainability",
        "nature",
        "animal welfare",
        "housing",
        "education",
        "food",
        "community",
      ],
      event: {
        id: "",
        category: "",
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        organizer: "",
        extras: {
          catering: false,
          music: false,
        },
      },
    };
  },
  methods: {
    onSubmit() {
      const event = {
        ...this.event,
        id: uuidv4(),
        organizer: this.$store.state.user,
      };
      this.$store
        .dispatch("createEvent", event)
        .then(() => {
          this.$router.push({
            name: "EventDetails",
            params: { id: event.id },
          });
        })
        .catch((err) => {
          this.$router.push({
            name: "ErrorDisplay",
            params: { error: err },
          });
        });
    },
  },
};
</script>
