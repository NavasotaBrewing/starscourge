<template>
    <w-flex class="mb12">
        <div class="xs6 mxa">
            <ModelSelector></ModelSelector>
        </div>
    </w-flex>


    <w-flex class="mb12">
        <div class="xs4 ma2">
            <NewRTU></NewRTU>
        </div>
    </w-flex>
</template>


<script>
import ModelSelector from "@/components/ModelSelector.vue";
import NewRTU from "@/components/NewRTU.vue";

export default {
    name: "ModelComponent",
    components: { ModelSelector, NewRTU }
}


</script>