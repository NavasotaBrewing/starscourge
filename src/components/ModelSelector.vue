<template>
    <w-card title="Select A Model" title-class="blue-light3--bg">
        <p class="mb4">Activate a model to use, or create a new one below.</p>
        <w-table class="mb4" :headers="table.headers" :items="table.items" :selectable-rows="table.selectableRows"
            :force-selection="table.forceSelection" @row-select="selectionInfo = $event">
        </w-table>
        <div class="mt2">
            <w-button @click="activateModel()" class="mr2" lg>Activate</w-button>
            <w-button v-if="modelActive()" @click="deactivateModel()" class="mr2" lg bg-color="secondary">Deactivate
            </w-button>
            <w-button @click="$refs.NewModelDialog.show()" class="mr2" lg bg-color="success">New</w-button>
            <!-- <w-button v-else @click="newModel()" class="mr2" lg bg-color="success">New</w-button> -->
            <w-button class="mr2" bg-color="error" lg>Delete</w-button>
        </div>
    </w-card>

    <!-- This is the dialog for adding a new model -->
    <NewModel ref="NewModelDialog" />

</template>

<script>
import NewModel from './NewModel.vue';
export default {
    name: "ModelSelector",
    data() {
        return {
            table: {
                headers: [
                    { label: "Model Name", key: "name" },
                    { label: "Date Created", key: "date" },
                    { label: "RTU Count", key: "rtuCount" }
                ],
                items: [
                // { name: "Testing Model", date: 'Feb 1, 2022', rtuCount: 6 },
                ],
                selectableRows: 1,
                forceSelection: true
            },
            selectionInfo: {}
        };
    },
    methods: {
        activateModel() {
            let model = this.$root.models.filter((mdl) => mdl.name == this.selectionInfo.item.name)[0];
            this.$root.activateModel(model);
        },
        deactivateModel() {
            this.$root.deactivateModel();
        },
        modelActive() {
            return this.$root.activeModel.name != undefined;
        },
        showNewModelDialog() {

        }
    },
    mounted() {
        window.ms = this;
        // Initialize the table of models from the roots list of models
        this.$root.models.forEach(mdl => {
            this.table.items.push({
                name: mdl.name,
                date: mdl.date,
                rtuCount: mdl.RTUs.length
            });
        });
    },
    components: { NewModel }
}

</script>