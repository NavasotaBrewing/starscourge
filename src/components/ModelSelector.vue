<template>
    <w-card title="Select A Model" title-class="blue-light5--bg">
        <p class="mb2">Activate a model to use or edit it.</p>
        <w-table :headers="table.headers" :items="table.items" :selectable-rows="table.selectableRows"
            :force-selection="table.forceSelection" @row-select="selectionInfo = $event">
        </w-table>
        <div class="mt2">
            <w-button class="mr2" lg>Activate</w-button>
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
                    { name: "Testing Model", date: 'Feb 1, 2022', rtuCount: 6 },
                    // { name: "Testing Model 2", date: 'Feb 2, 2022', rtuCount: 2 },
                    // { name: "Testing Model 3", date: 'Feb 3, 2022', rtuCount: 3 },
                    // { name: "Testing Model 4", date: 'Feb 4, 2022', rtuCount: 3 },
                    // { name: "Testing Model 5", date: 'Feb 5, 2022', rtuCount: 1 },
                    // { name: "Testing Model 6", date: 'Feb 6, 2022', rtuCount: 2 },
                ],
                selectableRows: 1,
                forceSelection: true
            },
            selectionInfo: {}
        }
    }
}

</script>