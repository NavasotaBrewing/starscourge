<template>
    <w-card title="Select A Model" title-class="blue-light5--bg">
        <p class="mb2">Activate a model to use or edit it.</p>
        <w-table :headers="table.headers" :items="table.items" :selectable-rows="table.selectableRows"
            :force-selection="table.forceSelection" @row-select="selectionInfo = $event">
        </w-table>
        <div class="mt2">
            <w-button @click="activateModel()" class="mr2" lg>Activate</w-button>
            <w-button @click="deactivateModel()" class="mr2" lg bg-color="secondary">Deactivate</w-button>
            <w-button class="mr2" bg-color="error" lg>Delete</w-button>
        </div>
    </w-card>

</template>

<script>
export default {
    name: "ModelSelector",
    data() {
        return {
            table: {
                headers: [
                    { label: 'Model Name', key: 'name' },
                    { label: 'Date Created', key: 'date' },
                    { label: 'RTU Count', key: 'rtuCount' }
                ],
                items: [
                    // { name: "Testing Model", date: 'Feb 1, 2022', rtuCount: 6 },
                ],
                selectableRows: 1,
                forceSelection: true
            },
            selectionInfo: {}
        }
    },
    methods: {
        activateModel() {
            let model = this.$root.models.filter((mdl) => mdl.name == this.selectionInfo.item.name)[0];
            this.$root.activateModel(model);
        },
        deactivateModel() {
            this.$root.deactivateModel();
        }
    },
    mounted() {
        this.$root.models.forEach(mdl => {
            this.table.items.push({
                name: mdl.name,
                date: mdl.date,
                rtuCount: mdl.RTUs.length
            });
        });
    }
}

</script>