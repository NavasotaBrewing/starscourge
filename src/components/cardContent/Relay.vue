<template>
    <div class="title1">{{ device.state }}</div>
    
    <w-flex>
        <div class="spacer"></div>
        <w-button @click="toggleState('Off')" bg-color="error" class="mr2 enactor">Turn Off</w-button>
        <w-button @click="toggleState('On')" bg-color="success" class="enactor">Turn On</w-button>
    </w-flex>
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