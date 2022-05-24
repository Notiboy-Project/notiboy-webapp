<template>
  <!-- Header consisting of desktop and mobile view -->
  <div class="main-nav">
    <div class="brand_logo">
      <a href="!#"><img src="../assets/logo.png" alt="" /></a>
    </div>
  </div>
  <!-- Mobile Nav -->
  <!-- <div class="mobile-nav">
    <label>
      <span></span>
      <span></span>
      <span></span>
    </label>
    <div class="brand_logo">
      <a href="!#"><img src="../assets/logo.png" alt=""></a>
    </div>
    <div>
    </div>
  </div> -->
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* The navigation for desktop view */
.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1% 7% 0 7%;
  padding: 1.4% 0 1.4% 0;
  letter-spacing: 0.1rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
}
.brand_logo {
  display: flex;
}
.brand_logo a img {
  padding: 0 0 0 1rem;
  width: 5rem;
  height: auto;
}
.wallet {
  /* height: 8rem; */
  display: flex;
  align-items: center;
  color: #ccece6;
  text-decoration: none;
}
.wallet-background {
  background: var(--teritary);
  align-items: center;
  padding-right: 4rem;
  border-radius: 1rem;
  cursor: pointer;
}
/* Navigation for mobile and tablet view */
.mobile-nav {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin: 1rem 10rem 0 10rem;
}
label {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 4.5rem;
  cursor: pointer;
}
label span {
  background: #fff;
  border-radius: 8rem;
  height: 0.7rem;
  margin: 0.4rem 0;
  transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
</style>
