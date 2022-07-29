<template>
    <w-flex class="mb12">
        <div class="xs6 mxa">
            <ModelSelector></ModelSelector>
        </div>
    </w-flex>


    <w-flex v-if="$root.modelActive()" class="mb12">
        <div class="xs4 ma2">
            <NewRTU></NewRTU>
        </div>
        
        <div class="xs6 ma2">
            <w-card title="All RTUs" title-class="blue-light5--bg">
                <!-- Shows all RTUs as a table from the active model -->
                <RTUTable></RTUTable>
            </w-card>
        </div>
    </w-flex>

    <w-flex v-if="$root.modelActive()" class="mb12">
        <div class="xs4 ma2">
            <NewDevice></NewDevice>
        </div>
    </w-flex>
</template>


<script>
import ModelSelector from "@/components/ModelSelector.vue";
import NewRTU from "@/components/NewRTU.vue";
import RTUTable from "@/components/RTUTable.vue";
import NewDevice from "@/components/NewDevice.vue";

export default {
    name: "ModelComponent",
    components: { ModelSelector, NewRTU, RTUTable, NewDevice }
}


</script>