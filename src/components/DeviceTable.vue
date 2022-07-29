<template>
    <w-table :headers="table.headers" :items="table.items">

        <template #item="{ item, select, classes }">
            <tr :class="classes" @click="select">
                <td class="pa1">{{ item.id }}</td>
                <td class="pa1">{{ item.name }}</td>
                <td class="pa1">{{ item.rtu }}</td>
                <td class="pa1">{{ item.driver }}</td>
                <td class="pa1">{{ item.controller_addr }}</td>
                <td class="pa1">{{ item.device_addr }}</td>
            </tr>
        </template>
    </w-table>
</template>


<script>

export default {
    name: "DeviceTable",
    data() {
        return {
            table: {
                headers: [
                    { label: "ID", key: "id" },
                    { label: "Name", key: "name" },
                    { label: "RTU", key: "rtu" },
                    { label: "Driver", key: "driver" },
                    { label: "Controller Addr", key: "controller_addr" },
                    { label: "Device Addr", key: "device_addr" }
                ],
                items: []
            }
        }
    },
    mounted() {
        window.table = this;
        this.refresh();
    },
    methods: {
        refresh() {
            this.$root.activeModel.RTUs.forEach(rtu => {
                rtu.devices.forEach(dev => {
                    this.table.items.push({ id: dev.id, name: dev.name, rtu: rtu.name, driver: dev.driver, controller_addr: dev.controller_addr, device_addr: dev.addr });
                });
            });
        }
    }
}

</script>