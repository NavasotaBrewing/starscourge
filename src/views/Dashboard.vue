<template>
    <w-flex wrap>
        <div class="xs2"></div>
        <div class="xs12 lg6 pa1">
            <div class="title1 mb6">All RTUs ({{ RTUs().length }})</div>

            <RTUDisplay v-for="rtu in RTUs()" :key="rtu.id" :rtu="rtu" />
        </div>

    </w-flex>
</template>

<script>
import RTUDisplay from "@/components/RTUDisplay.vue";

export default {
    name: "DashboardComponent",
    components: { RTUDisplay },
    data() {
        return {}
    },
    methods: {
        RTUs() {
            return this.$root.RTUs;
        },
        
    }
}

</script>