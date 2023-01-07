<template>
  <div class="dummytext_container">
    <button @click.prevent="globaloptin">Register<br />(Global Opt-in)</button>
  </div>
</template>

<style scoped>
.dummytext_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

button {
  background: var(--teritary);
  border: var(--teritary);
  padding: 1rem;
  border-radius: 0.8rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
