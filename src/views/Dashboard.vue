<template>
    <w-flex wrap v-for="rtu in RTUs()" :key="rtu.id">
        <!-- RTU display column -->
        <div class="pa2 xl4 lg4 md12">
            <RTUDisplay :rtu="rtu" />
        </div>

        <!-- Relays column -->
        <div class="pa2 xl3 lg4 md12">
            <w-card class="grow" title-class="blue-light5--bg title1" :title="'Relays on ' + rtu.name">
                <div class="mb2 xs12" v-for="dev in relays(rtu)" :key="dev.id">
                    <RelaySwitch :device="dev" />
                </div>
            </w-card>
        </div>

        <div class="pa2 lg4 md12">
            <w-card class="grow" title-class="blue-light5--bg title1" :title="'Thermometers on ' + rtu.name">
                <div class="mb2 xs12" v-for="dev in thermometers(rtu)" :key="dev.id">
                    <ThermometerControl :thermo="dev" />
                </div>
            </w-card>
        </div>

    </w-flex>

    <div v-if="RTUs().length == 0">
        <w-flex  class="justify-center">
            <div class="title1">Connecting to RTUs...</div>
        </w-flex>
        <w-flex class="justify-center">
            <pre>Locations: {{ addresses() }}</pre>
        </w-flex>
    </div>
</template>

<script>
import RTUDisplay from "@/components/RTUDisplay.vue";
import RelaySwitch from "@/components/RelaySwitch.vue";
import ThermometerControl from "@/components/ThermometerControl.vue";
import bcs from "@/bcs.js";

export default {
    name: "DashboardComponent",
    components: { RTUDisplay, RelaySwitch, ThermometerControl },
    data() {
        return {}
    },
    methods: {
        RTUs() {
            return this.$root.allRTUs();
        },

        addresses() {
            return bcs.RTU_addresses;
        },

        relays(rtu) {
            return rtu.devices.filter(dev => this.isRelay(dev));
        },

        thermometers(rtu) {
            return rtu.devices.filter(dev => this.isThermometer(dev));
        },

        isRelay(dev) {
            let relay_types = ["STR1", "Waveshare", "WaveshareV2"];
            return relay_types.indexOf(dev.conn.controller) != -1;
        },

        isThermometer(dev) {
            let thermo_types = ["CN7500"];
            return thermo_types.indexOf(dev.conn.controller) != -1;
        },

    }
}

</script>
