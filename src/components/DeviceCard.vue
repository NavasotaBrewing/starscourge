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

    <RelayCardContent v-if="device.controller == 'Waveshare' || device.controller == 'STR1'" :device="device" />
        <!-- Currently this is called Omega but I plan to rename it to CN7500 -->
        <ThermometerCardContent v-if="device.controller == 'Omega' || device.controller == 'CN7500'" :thermometer="device" />
    </w-card>

</template>


<script>
import RelayCardContent from "@/components/cardContent/Relay.vue";
import ThermometerCardContent from "@/components/cardContent/Themometer.vue";

export default {
    name: "DeviceCard",
    components: { RelayCardContent, ThermometerCardContent },
    props: ["device", "rtu"]
}

</script>