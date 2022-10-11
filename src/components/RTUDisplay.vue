<template>
    <w-card class="grow" :title="rtu.name">
        <div class="title3 mb1">Details</div>
        <hr class="mb2" />
        <pre><w-list :items="RTUAttributesAsList(rtu)" icon="fa fa-cog"></w-list></pre>

        <div class="title3 mb1 mt3">Devices ({{ rtu.devices.length }})</div>
        <hr class="mb2" />
        <w-table class="mb3" :headers="deviceTableHeaders()" :items="deviceTableItems(rtu.devices)" />


        <template #actions>
            <div class="spacer"></div>
            <w-button @click="testConnection(rtu)" bg-color="success">Test Connection</w-button>
        </template>
    </w-card>

</template>



<script>
import bcs from "@/bcs.js";
export default {
    name: "RTUDisplay",
    props: ["rtu"],
    methods: {
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
                { label: "ID", key: "id" },
                { label: "Name", key: "name" },
                { label: "Driver", key: "driver" },
                { label: "Controller Addr", key: "controller_addr" },
                { label: "Addr", key: "addr" },
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
        },

        async testConnection(rtu) {
            let resp = await bcs.testConnection(rtu.ip_addr);
            if (resp) {
                this.$waveui.notify(rtu.name + " is connected!", "success");
            } else {
                this.$waveui.notify(rtu.name + " didn't respond", "danger");
            }
        }
    }
}


</script>