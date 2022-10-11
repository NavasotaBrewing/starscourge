<template>
    <div v-if="device.state == 'On'" class="title1">On</div>
    <div v-else-if="device.state == 'Off'" class="title1">Off</div>
    <div v-else class="title1">Error: couldn't get state</div>
    
    <div class="spacer mt4"></div>
    <w-button @click="toggleState('Off')" bg-color="error" class="mr2 enactor">Turn Off</w-button>
    <w-button @click="toggleState('On')" bg-color="success" class="enactor">Turn On</w-button>
</template>

<script>
export default {
    name: "RelayCardContent",
    props: ["device"],
    methods: {
        toggleState(newState) {
            // Instead of emitting up multiple layers, we just mutate the roots data directly
            // This probably isn't great but it works
            this.$root.mapDevice(this.device.id, (dev) => dev.state = newState );
        }
    }
}
</script>