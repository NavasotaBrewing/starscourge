<template>
    <w-card class="grow" title-class="blue-light5--bg title1" :title="rtu.name">
        <div class="title3 mb1">Details</div>
        <hr class="mb2" />
        <pre><w-list :items="RTUAttributesAsList(rtu)" icon="fa fa-cog"></w-list></pre>

        <div class="title3 mb1 mt3">Device Cluster ({{ rtu.devices.length }} devices)</div>
        <hr class="mb2" />
        <w-table class="mb3" :headers="deviceTableHeaders()" :items="deviceTableItems(rtu.devices)" />
    </w-card>

</template>



<script>
export default {
    name: "RTUDisplay",
    props: ["rtu"],
    methods: {
        makeLabel(labelName, value) {
            return { label: labelName + ": " + value };
        },

        RTUAttributesAsList(rtu) {
            let list = [];
            list.push(this.makeLabel("ID", rtu.id));
            list.push(this.makeLabel("Devices found", rtu.devices.length));
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
                    driver: dev.conn.controller.toString(),
                    // If this value is 0, javascript turns it into '' instead of '0' because it's stupid
                    addr: dev.conn.addr.toString(),
                    controller_addr: dev.conn.controller_addr
                });
            });
            return items;
        }
    }
}


</script>
