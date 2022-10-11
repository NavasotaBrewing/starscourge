<template>
    <w-card tile>
        <template #title>
            <w-toolbar>
                <div class="title3">{{ device.name }}</div>
                <div class="spacer"></div>
                <span class="title5">
                    <pre>{{ rtu.name }} > {{ device.id }}</pre>
                </span>
            </w-toolbar>
        </template>

        <RelayCardContent v-if="device.driver == 'Waveshare' || device.driver == 'STR1'" :device="device" />
    </w-card>

</template>


<script>
import RelayCardContent from "@/components/RelayCardContent.vue";

export default {
    name: "DeviceCard",
    components: { RelayCardContent },
    props: ["device", "rtu"]
}

</script>