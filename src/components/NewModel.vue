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

        <w-form v-model="formValid">

            <w-flex class="mb6" row>
                <div class="xs8 mr1">
                    <w-input v-model="model.name" :validators="[validators.required]">Model Name *</w-input>
                </div>
                <div class="xs4">
                    <w-input v-model="model.date" label="Date *" placeholder="06-20-2022"
                        :validators="[validators.required]"></w-input>
                </div>
            </w-flex>

            <w-flex class="mb12" row>
                <div class="xs12 mr1">
                    <w-textarea v-model="model.description">Description</w-textarea>
                </div>
            </w-flex>

            <w-flex class="mb12">
                <div class="xs6 mr1">
                    <w-input v-model="model.slackChannel">Slack Channel Name</w-input>
                </div>

                <div class="xs6">
                    <w-input v-model="model.slackWebhook">Slack Webhook Address</w-input>
                </div>
            </w-flex>

            <w-flex class="mb6">
                <div class="xs12 mr1">
                    <w-input :validators="[validators.required]" v-model="masterAddr">Master Address *</w-input>
                </div>
            </w-flex>

            <w-flex class="justify-end">
                <w-button @click="add" type="submit" class="mr2" lg bg-color="success">Add</w-button>
            </w-flex>

        </w-form>

    </w-dialog>


</template>

<script>

import db from "@/db.js";

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
            model: {},
            formValid: null,
            validators: {
                required: value => !!value || 'This field is required'
            }
        }
    },
    mounted() {
        window.nm = this;
    },
    methods: {
        show() {
            this.dialog.show = true;
        },
        add() {
            if (!this.formValid) {
                this.$root.$waveui.notify("Form not valid yet", 'warning', 3000);
                return;
            }

            this.model.RTUs = [];
            console.info("New model created, sending following model to db");
            console.info(this.model);

            // persist in database
            db.createModel(this.model)
                .then((createdModel) => {
                    this.$root.$waveui.notify("Model created!", "success", 6000);
                    console.info("Model returned from DB:");
                    console.info(createdModel);
                }).catch((err) => {
                    this.$root.$waveui.notify("Something went wrong. Check database connection.", "error", 6000);
                    console.error(err);
                })
        }
    }
}

</script>