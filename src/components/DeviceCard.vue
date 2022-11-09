<template>
    <w-card>
        <template #title>
            <w-toolbar class="blue-light5--bg">
                <div class="title3">{{ device.name }}</div>
                <div class="spacer"></div>
                <span class="title5">
                    <pre>{{ rtu.name }} > {{ device.id }}</pre>
                </span>
            </w-toolbar>
        </template>

        <RelayCardContent v-if="isRelay()"
            :device="device" />
        <ThermometerCardContent v-if="isThermometer()"
            :thermometer="device" />
    </w-card>

</template>


<script>
import RelayCardContent from "@/components/cardContent/Relay.vue";
import ThermometerCardContent from "@/components/cardContent/Themometer.vue";

export default {
    name: "DeviceCard",
    components: { RelayCardContent, ThermometerCardContent },
    props: ["device", "rtu"],
    methods: {
        isRelay() {
            let relay_types = ["STR1", "Waveshare", "WaveshareV2"];
            return relay_types.indexOf(this.device.conn.controller) != -1;
        },
        isThermometer() {
            let thermo_types = ["CN7500"];
            return thermo_types.indexOf(this.device.conn.controller) != -1;
        },
    }
}

</script>