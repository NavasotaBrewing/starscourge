<template>
    <w-flex class="mb12">
        <div class="xs6 mxa">
            <ModelSelector />
        </div>
    </w-flex>


    <w-flex v-if="$root.modelActive()" class="mb12">
        <div class="xs4 ma2">
            <NewRTU ref="NewRTU" @newRTU="$refs.RTUTable.refresh()" />
        </div>

        <div class="xs6 ma2">
            <w-card title="All RTUs" title-class="blue-light5--bg">
                <!-- Shows all RTUs as a table from the active model -->
                <RTUTable ref="RTUTable" />
            </w-card>
        </div>
    </w-flex>

    <w-flex v-if="$root.modelActive()" class="mb12">
        <div class="xs4 ma2">
            <NewDevice ref="NewDevice" />
        </div>

        <div class="xs6 ma2">
            <w-card title="All Devices" title-class="blue-light5--bg">
                <DeviceTable ref="DeviceTable" />
            </w-card>
        </div>
    </w-flex>

    <w-button v-if="$root.modelActive()" @click="saveModel()" id="saveButton" bg-color="success" xl shadow>
        <w-icon class="mr2">fa fa-floppy-o</w-icon>
        Save
    </w-button>

</template>

<style scoped>
#saveButton {
    position: fixed;
    right: 2em;
    bottom: 2em;
}
</style>

<script>
import ModelSelector from "@/components/ModelSelector.vue";
import NewRTU from "@/components/NewRTU.vue";
import RTUTable from "@/components/RTUTable.vue";
import NewDevice from "@/components/NewDevice.vue";
import DeviceTable from "@/components/DeviceTable.vue";
import db from "@/db.js";

export default {
    name: "ModelComponent",
    components: { ModelSelector, NewRTU, RTUTable, NewDevice, DeviceTable },
    methods: {
        saveModel() {
            console.log("Model saved");

            db.updateModel(
                this.$root.activeModel.id,
                this.$root.activeModel
            ).then((resp) => {
                console.info("Model updated");
                console.info(resp);
                this.$root.$waveui.notify("Model saved", 'success', 3000);
            }).catch((err) => {
                this.$root.$waveui.notify("Model couldn't be saved. Check database connection.", 'error', 10_000);
                console.error(err);
            })
        }
    }
}


</script>