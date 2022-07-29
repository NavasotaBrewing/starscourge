<template>
    <w-card title="Add an RTU" title-class="blue-light3--bg">
        <w-flex class="mb6">
            <div class="xs6 mr1">
                <w-input>Name</w-input>
            </div>
            <div class="xs6">
                <w-input>Location</w-input>
            </div>
        </w-flex>

        <w-flex class="mb6 md">
            <div class="xs6">
                <w-input>ID</w-input>
            </div>
            <div class="xs6">
                <w-input>IPv4 Address</w-input>
            </div>
        </w-flex>

        <w-flex class="justify-end">
            <w-button @click="add" class="mr2" lg bg-color="success">Add</w-button>
        </w-flex>
    </w-card>
</template>

<style scoped>
</style>

<script>
// See src/dummy_model.js for the spec for an RTU

export default {
    name: "AddRTU",
    data() {
        return {}
    },
    methods: {
        add() {
            // TODO: Emit here
        }
    }
}

</script>