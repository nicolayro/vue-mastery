<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ["event"],
  inject: ["GStore"],
  methods: {
    register() {
      // Registrer bruker

      this.GStore.flashMessage =
        "You are successfully registered for " + this.event.title;

      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);
      // Dersom alt gikk bra, send bruker tilbake til detaljer siden

      this.$router.push({
        name: "EventDetails",
      });
    },
  },
};
</script>

<style scoped></style>
