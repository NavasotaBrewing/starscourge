<template>
    <w-flex wrap>
        <!-- Relays column -->
        <div class="px2 xl6 lg12 md12 sm12 xs12">
            <w-card class="grow" title-class="blue-light5--bg title1" :title="'Relays on ' + rtu.name">
                <div class="mb2 xs12" v-for="dev in relays(rtu)" :key="dev.id">
                    <RelaySwitch @deviceEnacted="$emit('deviceEnacted', $event)" :device="dev" />
                </div>
            </w-card>
        </div>

        <div class="px2 xl6 lg12 md12 sm12 xs12">
            <w-card class="grow" title-class="blue-light5--bg title1" :title="'Thermometers on ' + rtu.name">
                <div class="mb2 xs12" v-for="dev in thermometers(rtu)" :key="dev.id">
                    <ThermometerControl @deviceEnacted="$emit('deviceEnacted', $event)" :thermo="dev" />
                </div>
            </w-card>
        </div>
    </w-flex>
</template>


<script>
import RelaySwitch from "@/components/RelaySwitch.vue";
import ThermometerControl from "@/components/ThermometerControl.vue";

export default {
    name: 'RTUControlPanel',
    props: ['rtu'],
    components: { RelaySwitch, ThermometerControl },
    data() {
        return {

        }
    },
    methods: {
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
