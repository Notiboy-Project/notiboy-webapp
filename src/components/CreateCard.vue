<template>
    <div class="create-card">
        <input class="channel-name" v-model="channelName" maxlength = "20" placeholder="Channel Name" />
        <div class="channel-type">
            <div class="channel-type-private">
                <input type="radio" id="private" value="private" v-model="channelType" />
                <label for="private">Private</label>
            </div>
            <div class="channel-type-public">
                <input type="radio" id="public" value="public" v-model="channelType" />
                <label for="public">Public</label>
            </div>  
        </div>
        <button @click.prevent="createChannel">Create Channel</button>

        <p style="text-align:center">Note: Public channels are used for sending public notifications and private channels are used to send receiver specific notifications.</p>

    </div> 
</template>
<script>
export default {
    data(){
        return{
            channelName:"",
            channelType:""
        }
    },

    methods:{
        createChannel(){
            console.log("channel created")
        }
    }
}
</script>
<style scoped>
.create-card{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 30rem;
    padding-top: 8rem;
    padding-bottom: 5rem;
    font-weight: bold;
}

input.channel-name{
    font-weight: bold;
    width: 30rem;
    height: 4rem;
    color: white;
    border: 2px solid var(--tertiary);
    border-radius: 0.5rem;
    background-color: var(--primary);
    padding-left: 0.6rem;
}

input.channel-name :focus{
    border: 1px solid var(--tertiary);
}

input:focus, input.form-control:focus {

    outline:none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}

.channel-type{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.channel-type-public{
    padding-left: 3rem;
}

button{
    background: var(--teritary);
    border: var(--teritary);
    padding: 1rem;
    border-radius: 0.8rem;
    color:white;
    font-weight: bold;
    cursor: pointer;
}

</style>