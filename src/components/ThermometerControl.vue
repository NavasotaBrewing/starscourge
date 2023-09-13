<template>
    <div class="thermo-container pa4">
        <w-flex wrap class="mb8">
            <div class="xs6 title1">{{ thermo.name }}</div>
        </w-flex>
        <w-flex wrap>
            <div class="xs6 text-left">
                Actual
                <div class="title1">{{ asFloat(thermo.state.pv) }} F</div>
            </div>
            <div class="xs6">
                <RelaySwitch class="thermo-relay-switch" customLabel="Relay" :device="thermo" />
            </div>
        </w-flex>
        <div class="mt8">
            <w-flex wrap>
                <div class="xs6 text-left">
                    Setpoint
                    <div class="title1">{{ asFloat(thermo.state.sv) }} F</div>
                </div>
                <div class="xs6 text-right">
                    <w-flex class="align-end">
                        <w-input label="New Setpoint" id="newSetpointInput" v-model="newSetpoint"></w-input>
                        <w-button class="ma1 text-left" bg-color="primary" id="newSetpointButton" @click="setNewSetpoint" md>Set</w-button>
                    </w-flex>
                </div>
            </w-flex>
        </div>
    </div>
</template>

<style scoped>
    .thermo-container {
        border: 2px solid black;
    }
</style>

<script>
import RelaySwitch from "@/components/RelaySwitch.vue";

export default {
    name: 'ThermometerControl',
    props: ['thermo'],
    components: { RelaySwitch },
    data() {
        return {
            newSetpoint: ''
        }
    },
    methods: {
        asFloat(value) {
            return parseFloat(value).toFixed(1);
        },

        setNewSetpoint() {
            if (this.newSetpoint == '') {
                this.$waveui.notify('New setpoint value must be present', 'error');
                return;
            }

            let newSetpoint = parseFloat(this.newSetpoint);

            if (isNaN(newSetpoint)) {
                this.$waveui.notify('New setpoint value must be a number', 'error');
                return;
            }

            if (newSetpoint < 0.0 || newSetpoint > 550.0) {
                this.$waveui.notify('New setpoint value is out of range', 'error');
                return;
            }

            this.$root.mapDevice(this.thermo.id, (dev) => dev.state.sv = newSetpoint );
            this.$root.bcs.enactDevice(this.thermo.id);
            this.newSetpoint = '';
        }
    }
}
</script>
