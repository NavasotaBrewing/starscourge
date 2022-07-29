<template>
    <w-card title="Add a Device" title-class="blue-light3--bg">
        <w-flex class="mb6">
            <div class="xs6 mr2">
                <w-select :items="RTUs" outline>RTU</w-select>
            </div>
            <div class="xs6 mr2">
                <w-select :items="drivers" outline>Driver</w-select>
            </div>
        </w-flex>

        <w-flex class="mb6 md">
            <div class="xs6 mr2">
                <w-input>Name</w-input>
            </div>
            <div class="xs3 mr2">
                <w-input>Controller Address</w-input>
            </div>
            <div class="xs3 mr2">
                <w-input>Device Address</w-input>
            </div>
        </w-flex>


        <w-flex class="justify-end">
            <w-button @click="add" class="mr2" lg bg-color="success">Add</w-button>
        </w-flex>
    </w-card>
</template>


<script>

export default {
    name: "NewDevice",
    data() {
        return {
            RTUs: [],
            drivers: [
                { label: "Waveshare" },
                { label: "CN7500" },
                { label: "STR1" }
            ]
        }
    },
    methods: {
        refresh() {
            this.$root.activeModel.RTUs.forEach(rtu => {
                this.RTUs.push({ label: rtu.name, value: rtu.id })
            });
        }
    },
    mounted() {
        this.refresh();
    }
}

</script>