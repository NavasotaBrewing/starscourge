<template>
    <w-card title="Add an RTU" title-class="blue-light3--bg">
        <w-form v-model="formValid">
            <w-flex class="mb6">
                <div class="xs6 mr1">
                    <w-input v-model="newRTU.name" :validators="[validators.required]">Name*</w-input>
                </div>
                <div class="xs6">
                    <w-input v-model="newRTU.location">Location</w-input>
                </div>
            </w-flex>

            <w-flex class="mb6 md">
                <div class="xs6">
                    <w-input v-model="newRTU.id" :validators="[validators.required]">ID*</w-input>
                </div>
                <div class="xs6">
                    <w-input v-model="newRTU.ipv4" :validators="[validators.required]">IPv4 Address*</w-input>
                </div>
            </w-flex>

            <w-flex class="justify-end">
                <w-button @click="add" type="submit" class="mr2" lg bg-color="success">Add</w-button>
            </w-flex>
        </w-form>
    </w-card>
</template>

<style scoped>
</style>

<script>
// See src/dummy_model.js for the spec for an RTU

export default {
    name: "AddRTU",
    data() {
        return {
            newRTU: {},
            formValid: null,
            validators: {
                required: value => !!value || 'This field is required'
            }
        }
    },
    methods: {
        add() {
            if (!this.formValid) {
                return;
            }

            this.newRTU.devices = [];
            this.$root.activeModel.RTUs.push(this.newRTU);
            // We emit so that the device table (separate component)
            // knows to update to show it
            this.$emit('newRTU');
        }
    }
}

</script>