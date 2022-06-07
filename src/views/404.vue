<template>
  <main-header></main-header>
  <div class="notfound">
    <img src="../assets/404img.png" alt="My Algo Button" />
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
  padding: 2% 0;
}
.notfound h1 {
  font-size: 10rem;
  line-height: 3rem;
}
img{
  width: 20rem;
  height: auto;
}
</style>
