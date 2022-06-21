<template>
    <w-flex class="mb12">
        <div class="xs6 mxa">
            <ModelSelector></ModelSelector>
        </div>
    </w-flex>

    <w-flex>
        <div class="xs5 ma2">
            <w-card title="Model Details" title-class="blue-light5--bg">

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
</template>


<script>
import ModelSelector from "@/components/ModelSelector.vue";

export default {
    name: "ModelComponent",
    components: { ModelSelector }
}


</script>