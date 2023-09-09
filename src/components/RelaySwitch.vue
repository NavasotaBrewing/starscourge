<template>
    <div class="container">
        <div class="label" v-if="!hideLabel">{{ device.name }}</div>
        <div @click="setNewState('Off')" :class="{ 'off-button-active': !isOn() }" class="button off-button">Off</div>
        <div @click="setNewState('On')" :class="{ 'on-button-active': isOn() }" active class="button on-button">On</div>
    </div>
</template>

<style scoped>
    .container {
        display: flex;

        width: 350px;
        height: 50px;

        border: 2px solid black;
    }

    .label {
        display: inline-block;
        background-color: #E3F2FD;
        font-size: 18px;

        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .button {
        display: inline-block;
        
        font-size: 20px;

        width: 120px;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        border-left: 2px solid black;

        cursor: pointer;
        /* disable highlighting */
        user-select: none;
    }

    .off-button-active {
        background-color: #FF7E7E;
    }

    .on-button-active {
        background-color: #5EE58C;
    }
</style>

<script>
import bcs from "../bcs.js";
export default {
    name: "RelaySwitch",
    props: ["device", "hideLabel"],
    methods: {
        setNewState(newState) {
            // Instead of emitting up multiple layers, we just mutate the roots data directly
            // This probably isn't great but it works

            // Manually update the state on the RTU so that the switch state updates
            this.$root.mapDevice(this.device.id, (dev) => dev.state.relay_state = newState );
            // Then actually send the enact event so the real device updates
            bcs.enactDevice(this.device.id);
        },

        isOn() {
            return this.device.state.relay_state == "On";
        }
    }
}
</script>
