<template>

    <w-flex wrap>
        <div class="xs2"></div>
        <div class="xs12 lg6 pa1">
            <div class="title1 mb6">All RTUs ({{ RTUs().length }})</div>

            <w-card v-for="rtu in RTUs()" :key="rtu.id" :title="rtu.name">
                    <div class="grow">
                        <div class="title3 mb1">Details</div>
                        <hr class="mb2" />
                        <pre><w-list :items="RTUAttributesAsList(rtu)" icon="fa fa-cog"></w-list></pre>

                        <div class="title3 mb1 mt3">Devices ({{ rtu.devices.length }})</div>
                        <hr class="mb2" />
                        <w-table class="mb3" :headers="deviceTableHeaders()" :items="deviceTableItems(rtu.devices)" />
                    </div>

                    <template #actions>
                        <div class="spacer"></div>
                        <w-button bg-color="success">Test Connection</w-button>
                    </template>
                </w-card>
        </div>

    </w-flex>
</template>

<style scoped>

</style>

<script>
// import db from "@/db.js";

export default {
    name: "ModelComponent",
    components: {},
    methods: {
        RTUs() {
            return this.$root.RTUs;
        },
        makeLabel(labelName, value) {
            return { label: labelName + ": `" + value + "`" };
        },
        RTUAttributesAsList(rtu) {
            let list = [];
            list.push(this.makeLabel("ID", rtu.id));
            list.push(this.makeLabel("Devices Found", rtu.devices.length));
            return list;
        },

        // Gives the headers for the device table in each RTU
        deviceTableHeaders() {
            return [
                { label: "Name", key: "name" },
                { label: "ID", key: "id" },
                { label: "Driver", key: "driver" },
                { label: "Address", key: "addr" },
                { label: "Controller Address", key: "controller_addr" },
            ];
        },

        // Returns all the devices, formatted for the table
        deviceTableItems(devices) {
            let items = [];
            devices.forEach(dev => {
                items.push({
                    name: dev.name,
                    id: dev.id,
                    driver: dev.driver,
                    addr: dev.addr,
                    controller_addr: dev.controller_addr
                });
            });
            return items;
        }
    }
}


</script>