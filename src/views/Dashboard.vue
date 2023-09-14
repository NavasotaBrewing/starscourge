<template>
    <w-flex wrap v-for="rtu in RTUs()" :key="rtu.id">
        <!-- RTU display column -->
        <div class="pa2 xl4 lg4 md12 sm12 xs12">
            <RTUDisplay :rtu="rtu" />
        </div>

        <div class="pa2 xl8 lg8 md12 sm12 xs12">
            <RTUControlPanel @deviceEnacted="$emit('deviceEnacted', $event)" :rtu="rtu" />
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
import RTUControlPanel from "@/components/RTUControlPanel.vue";

export default {
    name: "DashboardComponent",
    components: { RTUDisplay, RTUControlPanel },
    data() {
        return {}
    },
    methods: {
        RTUs() {
            return this.$root.allRTUs();
        },

        addresses() {
            return this.$root.bcs.socket_man.RTU_addresses;
        },
    }
}

</script>
