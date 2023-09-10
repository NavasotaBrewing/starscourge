<template>
    <div class="sterile">
        <RelaySwitch hideLabel="true" :device="testDevice()" />
    </div>
</template>

<style scoped>
.sterile {
    border: 1px solid black;
    margin: 0;
    padding: 0;
    height: 150px;
    width: 500px;
}
</style>

<script>
import RelaySwitch from '@/components/RelaySwitch.vue';

export default {
    name: 'SandboxComponent',
    components: { RelaySwitch },
    data() {
        return {

        }
    },
    methods: {
        testDevice() {
            return this.$root.allRTUs()[0].devices[3];
        }
    }
}
</script>
