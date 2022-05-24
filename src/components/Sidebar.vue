<template>
  <div class="sidebar-scroll">
    <ul class="sidebar-menu">
      <li :class="{ 'sidebar-clicked': notiClick }" @click="notiClicked">
        Noti Box
      </li>
      <li :class="{ 'sidebar-clicked': publicClick }" @click="publicClicked">
        Public Channels
      </li>
      <li :class="{ 'sidebar-clicked': privateClick }" @click="privateClicked">
        Private Channels
      </li>
      <li>Create Channel</li>
      <li>Send Notification</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notiClick: true,
      publicClick: false,
      privateClick: false,
    };
  },
  // The methods to emit an event to parent (and from there to side pane) to change the dashboard.
  methods: {
    notiClicked() {
      (this.notiClick = true),
        (this.publicClick = false),
        (this.privateClick = false),
        this.$emit("pane-selection", "noticlick");
    },

    publicClicked() {
      (this.notiClick = false),
        (this.publicClick = true),
        (this.privateClick = false),
        this.$emit("pane-selection", "publicclick");
    },

    privateClicked() {
      (this.notiClick = false),
        (this.publicClick = false),
        (this.privateClick = true),
        this.$emit("pane-selection", "privateclick");
    },
  },
};
</script>

<style scoped>
.sidebar-scroll {
  display: flex;
  background: var(--secondary);
  border-radius: 3rem;
  margin-right: 8%;
  margin-bottom: 10%;
  margin-left: 8%;
  min-height: 40rem;
}
.sidebar-menu {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-around;
  color: white;
  list-style: none;
  align-items: flex-start;
}

.sidebar-menu li {
  transition: all 0.5s ease;
  cursor: pointer;
  font-size: 1.5rem;
}
/* This css class triggered when clicking options. */
.sidebar-clicked {
  background-color: var(--teritary);
  padding: 1.5rem;
  border-radius: 1rem;
}

@media only screen and (max-width: 981px) {
  .sidebar-scroll {
    display: none;
  }
}
</style>
