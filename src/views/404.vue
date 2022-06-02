<template>
  <main-header></main-header>
  <div class="notfound">
    <h1>404</h1>
    <h2>Uh oh... I think we're lost.</h2>
    <h3>The page you're looking for could not be found.</h3>
  </div>
</template>

<style scoped>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 8% 0;
}
.notfound h1 {
  font-size: 10rem;
  line-height: 3rem;
}
</style>
