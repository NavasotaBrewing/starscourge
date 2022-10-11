<template>

    <w-flex wrap>
        <div class="xs2"></div>
        <div class="xs10 pa1">
            <h1>RTUs</h1>

            <div class="xs4">
                <w-card v-for="rtu in RTUs()" :key="rtu.id" :title="rtu.name">
                    <div class="grow">
                        <div class="title3 mb1">Details</div>
                        <hr class="mb2" />
                        <pre><w-list :items="RTUAttributesAsList(rtu)" icon="fa fa-cog"></w-list></pre>

                        <div class="title3 mb1 mt3">Devices</div>
                        <hr class="mb2" />
                        <div v-for="dev in rtu.devices" :key="dev.id" class="grow">
                            <div class="title5 mb">{{ dev.name }}</div>
                            <pre><w-list :items="deviceAttibutesAsList(dev)" icon="fa fa-cog"></w-list></pre>
                            <pre></pre>
                        </div>
                    </div>
    
                    <template #actions>
                        <div class="spacer"></div>
                        <w-button bg-color="success">Test Connection</w-button>
                    </template>
                </w-card>
            </div>
        </div>

    </w-flex>
</template>

<style scoped>

</style>

<script>
// import db from "@/db.js";

export default {
    name: "ModelComponent",
    components: {},
    methods: {
        RTUs() {
            return this.$root.RTUs;
        },
        makeLabel(labelName, value) {
            return { label: labelName + ": `" + value + "`" };
        },
        RTUAttributesAsList(rtu) {
            let list = [];
            list.push(this.makeLabel("ID", rtu.id));
            list.push(this.makeLabel("Devices Found", rtu.devices.length));
            return list;
        },
        deviceAttibutesAsList(device) {
            let list = [];
            list.push(this.makeLabel("ID", device.id));
            list.push(this.makeLabel("Driver", device.driver));
            list.push(this.makeLabel("Address", device.addr));
            list.push(this.makeLabel("Controller Address", device.controller_addr));
            return list;
        }
    }
}


</script>