<template>
    <w-flex class="wrap">
        <div class="title1">Actual: {{ thermometer.pv }} °F</div>
    </w-flex>
    <w-flex>
        <div class="title1">Setpoint: {{ thermometer.sv }} °F</div>
    </w-flex>
    <w-flex class="mb6">
        <div class="title1">Relay: {{ thermometer.state }}</div>
    </w-flex>
    <w-form v-model="valid">
        <w-flex class="mb3">
            <w-input :validators="[numeric]" v-model="newSv" class="mr4">New Setpoint</w-input>
            <w-button @click="setSetpoint" type="submit" class="d-flex mla mt4 enactor">
                Set
            </w-button>
        </w-flex>
    </w-form>
    <w-flex>
        <w-button @click="toggleState('Off')" bg-color="error" class="mr2 enactor">Turn Off</w-button>
        <w-button @click="toggleState('On')" bg-color="success" class="enactor">Turn On</w-button>
    </w-flex>
</template>

<script>

export default {
    name: "ThemometerCardContent",
    props: ["thermometer"],
    data() {
        return {
            newSv: null,
            valid: null,
            numeric: (value) => {
                return !isNaN(parseFloat(value)) || "Value must be a decimal number";
            }
        }
    },
    methods: {
        toggleState(newState) {
            this.$root.mapDevice(this.thermometer.id, (thermo) => {
                thermo.state = newState;
            });
        },

        setSetpoint() {
            if (!this.valid)
                return;

            this.$root.mapDevice(this.thermometer.id, (thermo) => {
                thermo.sv = parseFloat(this.newSv);
            });
            this.newSv = null;
            setTimeout(() => {
                this.valid = null;
            }, 10);
        }
    }
}

</script>