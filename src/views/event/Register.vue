<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ["event"],
  methods: {
    register() {
      // Registrer bruker

      // Dersom alt gikk bra, send bruker tilbake til detaljer siden
      this.$router.push({
        name: "EventDetails",
      });
    },
  },
};
</script>

<style scoped></style>
