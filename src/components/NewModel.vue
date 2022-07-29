<template>
    <w-dialog v-model="dialog.show" :fullscreen="dialog.fullscreen" :width="dialog.width"
        :persistent="dialog.persistent" :persistent-no-animation="dialog.persistentNoAnimation"
        title-class="primary-light1--bg white">
        <template #title>
            New Model
            <w-flex class="justify-end">
                <w-button @click="dialog.show = false" icon="fa fa-times" color="default" text xl class="pa4 my4">
                </w-button>
            </w-flex>
        </template>

        <w-flex class="mb6" row>
            <div class="xs8 mr1">
                <w-input>Model Name</w-input>
            </div>
            <div class="xs4">
                <w-input label="Date" placeholder="06-20-2022"></w-input>
            </div>
        </w-flex>

        <w-flex class="mb12" row>
            <div class="xs12 mr1">
                <w-textarea>Description</w-textarea>
            </div>
        </w-flex>

        <w-flex class="mb12">
            <div class="xs6 mr1">
                <w-input>Slack Channel Name</w-input>
            </div>

            <div class="xs6">
                <w-input>Slack Webhook Address</w-input>
            </div>
        </w-flex>

        <w-flex class="mb6">
            <div class="xs12 mr1">
                <w-input>Master Address</w-input>
            </div>
        </w-flex>

        <w-flex class="justify-end">
            <w-button @click="add" class="mr2" lg bg-color="success">Add</w-button>
        </w-flex>
    </w-dialog>

</template>

<script>

export default {
    name: "NewModel",
    data() {
        return {
            dialog: {
                show: false,
                fullscreen: false,
                persistent: true,
                persistentNoAnimation: false,
                width: 800
            },
        }
    },
    methods: {
        show() {
            this.dialog.show = true;
        },
        add() {
            alert("New model");
        }
    }
}

</script>