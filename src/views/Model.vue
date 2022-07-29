<template>
    <w-flex class="mb12">
        <div class="xs6 mxa">
            <ModelSelector></ModelSelector>
        </div>
    </w-flex>

    <!-- New Model Details -->
    <w-flex class="mb12">
        <div class="xs4 ma2">
            <w-card title="New Model Details" title-class="blue-light5--bg">

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

            </w-card>
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