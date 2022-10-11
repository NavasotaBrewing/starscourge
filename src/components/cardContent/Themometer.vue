<template>
    <w-flex wrap>
        <div class="xs6 title2">
            <w-flex>Actual</w-flex>
            {{ thermometer.pv }}
        </div>
        <div class="xs6 title2">
            <w-flex>Setpoint</w-flex>
            {{ thermometer.sv }}
        </div>
    </w-flex>

    <div class="mt12"></div>

    <w-flex>
        <div class="spacer"></div>
        <div class="xs6">
            <div class="xs4 title2">{{ thermometer.state }}</div>
        </div>
        <div class="xs6">
            <w-button @click="toggleState('Off')" bg-color="error" class="mr2 enactor">Turn Off</w-button>
            <w-button @click="toggleState('On')" bg-color="success" class="enactor">Turn On</w-button>
        </div>

    </w-flex>
</template>

<script>

export default {
    name: "ThemometerCardContent",
    props: ["thermometer"],
    methods: {
        toggleState(newState) {
            this.$root.mapDevice(this.thermometer.id, (thermo) => {
                thermo.state = newState;
            });
        }
    }
}

</script>