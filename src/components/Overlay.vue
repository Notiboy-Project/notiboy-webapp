<template>
    <div id="navOverlay" class="overlay" :style="{height}" >

        <!-- Button to close the overlay navigation -->
        <a href="#" class="closebtn" @click="closeNav">&times;</a>
        <!-- Overlay content -->
        <div class="overlay-content">
            <a href="#">Noti Box</a>
            <a href="#">Public Channels</a>
            <a href="#">Private channels</a>
            <a href="#">Create Channels</a>
            <a href="#">Send Notification</a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            height:'0%'
        }
    },
    // Takes a prop from parent component, watches it continuously for changes and changes width of the overlay accordingly.
    props:['navOverlay'],
    watch:{
        navOverlay(){
            if(this.navOverlay == true){
                this.height = '100%'
            }else{
                this.height = '0%'
            }
        }
    },
    methods:{
        closeNav(){
            this.height ='0%'
            this.$emit('nav-closed')
        }
    }   
}
</script>
<style scoped>
.overlay {
  /* Height & width depends on how you want to reveal the overlay (see JS below) */   
  height: 0%;
  width: 100%;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  background-color: rgb(0,0,0); /* Black fallback color */
  background-color: rgba(0,0,0, 0.9); /* Black w/opacity */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}


.overlay-content {
  position: relative;
  top: 5%; /* 25% from the top */
  width: 100%; /* 100% width */
  text-align: center; /* Centered text/links */
  margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
}

.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 3rem;
  color: #f1f1f1;
  display: block; /* Display block instead of inline */
  transition: 0.3s; /* Transition effects on hover (color) */
}

.overlay a:hover, .overlay a:focus {
  color: var(--teritary);
}

.overlay .closebtn {
    font-size: 8rem;
    padding-left: 4rem;
}

@media screen and (max-height: 450px) {
  .overlay a {font-size: 2rem}
  .overlay .closebtn {
    font-size: 6rem;
    top: 1.5rem;
    right: 3.5rem;
  }
}
</style>