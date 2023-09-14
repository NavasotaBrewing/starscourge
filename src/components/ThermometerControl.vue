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
                <RelaySwitch class="thermo-relay-switch" customLabel="Relay" @deviceEnacted="setNewRelayState($event)" :device="thermo" />
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
                        <w-input :disabled="$root.isLocked()" label="New Setpoint" id="newSetpointInput" v-model="newSetpoint"></w-input>
                        <w-button :disabled="$root.isLocked()" class="ma1 text-left" bg-color="primary" id="newSetpointButton" @click="setNewSetpoint" md>Set</w-button>
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

            this.$emit('deviceEnacted', {
                id: this.thermo.id,
                new_state: {
                    sv: newSetpoint,
                    // Send this along with it so we maintain the pv and it doesn't become NaN
                    pv: this.thermo.state.pv,
                    relay_state: this.thermo.state.relay_state
                }
            })
            this.newSetpoint = '';
        },

        setNewRelayState(event) {
            // Normally we could just bubble up the event, but for the thermometer we 
            // want to maintain the sv and pv. We'll add it here
            event.new_state.pv = this.thermo.state.pv;
            event.new_state.sv = this.thermo.state.sv;
            this.$emit('deviceEnacted', event);
        }
    }
}
</script>
