<template>
<!-- Search bar  -->
    <div v-if="selectedComponent != 'create'" class="search">
      <input type="text" class="searchTerm" placeholder="Search"/>
      <button type="submit" class="searchButton">
        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/search--v1.png" />
      </button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selectedComponent: this.selection
        }
    },
    inject:['selection']
}
</script>

<style scoped>
/* Search Bar */
.search {
  width: 25%;
  display: flex;
  margin: 4% 0;
}

.searchTerm {
  width: 100%;
  border: 3px solid var(--primary);
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #ffffff;
  background-color: var(--primary);
  font-family: "Sora", sans-serif;
}

.searchTerm:focus {
  color: #ffffff;
  font-family: "Sora", sans-serif;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid var(--primary);
  background: var(--primary);
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

@media only screen and (max-width: 981px) {
  .search {
    width: 40%;
    display: flex;
    margin: 4% 0;
  }
}

@media only screen and (max-width: 526px) {
  .search {
    width: 50%;
    display: flex;
    margin: 4% 0;
  }
}
</style>