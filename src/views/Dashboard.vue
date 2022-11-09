<template>
    <w-flex wrap v-for="rtu in RTUs()" :key="rtu.id">
        <div class="pa2 xl4 lg6 md12">
            <RTUDisplay :rtu="rtu" />
        </div>

        <div class="pa2 xl8 lg6 md12">
            <w-flex wrap>
                <div class="pa2 xl4 lg6 md12" v-for="dev in rtu.devices" :key="dev.id">
                    <DeviceCard :rtu="rtu" :device="dev" />
                </div>
            </w-flex>
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
import DeviceCard from "../components/DeviceCard.vue";
import bcs from "@/bcs.js";

export default {
    name: "DashboardComponent",
    components: { RTUDisplay, DeviceCard },
    data() {
        return {}
    },
    methods: {
        RTUs() {
            return this.$root.allRTUs();
        },

        addresses() {
            return bcs.RTU_addresses;
        }

    }
}

</script>