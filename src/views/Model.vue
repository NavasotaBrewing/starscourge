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
            <w-card title="Add an RTU" title-class="blue-light5--bg">
                
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
                    <w-button class="mr2" lg bg-color="success">Add</w-button>
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