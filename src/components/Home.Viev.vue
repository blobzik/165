<template>
    <div class="home">
        <input type="number" v-model="room_id"/>
        <input type="text" v-model="message">
        <button class="btn">Send</button>
        <div class="chat"></div>
    </div>
</template>

<script>
const {io} = require("socket.io-client");
const socket = io("http://localhost:3001");

socket.on('message', (data) => {
    console.log(data);
})

socket.on('connect_error', (data) => {
    console.error(data);
})

import HelloWord from '@/components/HelloWorld.vue'

export default {
    name: 'HomeView',
    components: {
        HelloWorld
    },
    data() {
        return {
            message: null,
            room_id: 1
        }
    },
    methods: {
        send:() => {
            socket.emit('message', {
                message: this.message,
                room_id: this.room_id
            })
        }
    }
}
</script>