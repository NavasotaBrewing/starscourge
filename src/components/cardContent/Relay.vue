<template>
    <div class="title1">{{ device.state.relay_state }}</div>
    
    <w-flex>
        <div class="spacer"></div>
        <w-button @click="toggleState('Off')" bg-color="error" class="mr2">Turn Off</w-button>
        <w-button @click="toggleState('On')" bg-color="success">Turn On</w-button>
    </w-flex>
</template>

<script>
import bcs from "@/bcs.js";
export default {
    name: "RelayCardContent",
    props: ["device"],
    methods: {
        toggleState(newState) {
            // Instead of emitting up multiple layers, we just mutate the roots data directly
            // This probably isn't great but it works
            this.$root.mapDevice(this.device.id, (dev) => dev.state.relay_state = newState );
            bcs.enactDevice(this.device.id);
        }
    }
}
</script>