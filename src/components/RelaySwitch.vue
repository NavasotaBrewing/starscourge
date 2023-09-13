<template>
    <div v-if="!hideLabel" class="container">
        <div class="label" v-if="!customLabel">{{ device.name }}</div>
        <div class="label" v-else>{{ customLabel }}</div>
        <div @click="setNewState('Off')" :class="{ 'off-button-active': !isOn(), 'locked': $root.isLocked() }" class="button off-button">Off</div>
        <div @click="setNewState('On')" :class="{ 'on-button-active': isOn(), 'locked': $root.isLocked() }" active class="button on-button">On</div>
    </div>
    <div v-else class="container">
        <div @click="setNewState('Off')" :class="{ 'off-button-active': !isOn(), 'locked': $root.isLocked() }" class="button full-button no-left-border off-button">Off</div>
        <div @click="setNewState('On')" :class="{ 'on-button-active': isOn(), 'locked': $root.isLocked() }" active class="button full-button on-button">On</div>
    </div>
</template>


<style scoped>
    /* This is some bad css */
    .container {
        display: flex;

        width: 100%;
        height: 100%;

        border: 2px solid black;
    }

    .locked {
        cursor: not-allowed !important;
    }

    .no-left-border {
        border-left: none !important;
    }

    .label {
        display: inline-block;
        background-color: #E3F2FD;
        font-size: 18px;
        padding: 5px;

        width: 60%;

        display: flex;
        align-items: center;
        justify-content: center;
    }


    .button {
        display: inline-block;
        
        font-size: 20px;

        width: 20%;

        display: flex;
        align-items: center;
        justify-content: center;

        border-left: 2px solid black;

        cursor: pointer;
        /* disable highlighting */
        user-select: none;
    }

    .full-button {
        width: 50% !important;
    }

    .off-button-active {
        background-color: #FF7E7E;
    }

    .on-button-active {
        background-color: #5EE58C;
    }
</style>

<script>
export default {
    name: "RelaySwitch",
    props: ["device", "hideLabel", "customLabel"],
    methods: {
        setNewState(newState) {
            if (this.$root.isLocked()) {
                return;
            }
            // Manually update the state on the web interface
            this.$root.mapDevice(this.device.id, (dev) => dev.state.relay_state = newState );
            // Then actually send the enact event so the real device updates
            this.$root.bcs.enactDevice(this.device.id);
        },

        isOn() {
            return this.device.state.relay_state == "On";
        }
    }
}
</script>
