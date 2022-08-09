<template>
    <w-table :headers="table.headers" :items="table.items">

        <template #item="{ item, select, classes }">
            <tr :class="classes" @click="select">
                <code class="ma1"><td>{{ item.id }}</td></code>
                <td class="ma1">{{ item.name }}</td>
                <td class="ma1">{{ item.location }}</td>
                <code class="ma1"><td>{{ item.ipv4 }}</td></code>
                <td class="ma1">{{ item.device_count }}</td>
                <td class="ma1">
                    <w-button @click="removeRTU(item.id)" class="ma1" bg-color="error" sm>Remove</w-button>
                </td>
            </tr>
        </template>
    </w-table>
</template>


<script>

export default {
    name: "RTUTable",
    data() {
        return {
            activeModel: {},
            table: {
                headers: [
                    { label: "ID", key: "id" },
                    { label: "Name", key: "name" },
                    { label: "Location", key: "location" },
                    { label: "IPv4 Address", key: "ipv4" },
                    { label: "Device Count", key: "device_count" },
                    { label: "Options", key: "options" }
                ],
                items: []
            }
        }
    },
    mounted() {
        this.refresh();
    },
    methods: {
        removeRTU(id) {
            console.log("Remove RTU " + id);
            this.$root.activeModel.RTUs = this.$root.activeModel.RTUs.filter((rtu) => {
                return rtu.id != id;
            });
            this.refresh();
        },
        refresh() {
            this.table.items = [];
            this.$root.activeModel.RTUs.forEach(rtu => {
                this.table.items.push({ id: rtu.id, name: rtu.name, location: rtu.location, ipv4: rtu.ipv4, device_count: rtu.devices.length })
            });
        }
    }
}

</script>