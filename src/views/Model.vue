<template>
    <w-flex>
        <div class="xs6 mxa">
            <ModelSelector></ModelSelector>
        </div>
    </w-flex>
</template>


<script>
import ModelSelector from "@/components/ModelSelector.vue";

export default {
    name: "ModelComponent",
    components: { ModelSelector }
}


</script>