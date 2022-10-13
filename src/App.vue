<template>
    <w-app>

        <w-card id="main-content" class="grow" content-class="pa0">
            <w-toolbar vertical absolute left>

                <w-tooltip right align-top>
                    <template #activator="{ on }">
                        <a v-on="on" href="https://navasotabrewing.com" class="href" target="_blank">
                            <w-image :src="'https://cdn1.iconfinder.com/data/icons/agriculture-13/48/7-512.png'"
                                :width="45" :height="45">
                            </w-image>
                        </a>
                    </template>
                    Navasota Brewing Company
                </w-tooltip>


                <w-divider class="my6"></w-divider>

                <ToolbarItem linkto="/" icon="fa fa-sitemap">Dashboard</ToolbarItem>
            </w-toolbar>


            <router-view />
            <!-- <pre>{{ RTUs }}</pre> -->

        </w-card>



    </w-app>
</template>

<style scoped>
#main-content {
    /* Adds margin to clear the toolbar */
    padding-left: 80px;
    padding-top: 20px;
}
</style>

<script>
import ToolbarItem from '@/components/ToolbarItem.vue';
import bcs from "@/bcs.js";
import enactors from "@/enactors.js";

export default {
    name: "AppComponent",
    components: { ToolbarItem },
    
    data() {
        return {
            RTUs: [],
            requestOut: false,
            updateIntervalID: null,
            updateInterval: 10_000
        }
    },

    methods: {
        allRTUs() {
            return this.RTUs;
        },

        allDevices() {
            let devices = [];
            this.RTUs.forEach(rtu => {
                devices.push(rtu.devices);
            });
            return devices.flat();
        },

        findDevice(id) {
            return this.allDevices().find((dev) => dev.id == id);
        },

        mapDevice(id, func) {
            let device = this.findDevice(id);
            func(device);
        },

        async updateAllRTUs(mode) {
            this.requestOut = true;
            Object.values(this.RTUs).forEach((rtu, index) => {
                bcs.update(rtu, mode, (response) => {
                    this.RTUs[index] = response.data;
                    this.requestOut = false;
                });
            });
        }
    },

    async created() {
        // Initialization
        Promise.all(
            bcs.RTU_addresses.map((addr) => bcs.findRTUAt(addr) )
        ).then((results) => {
            results.forEach(response => {
                this.RTUs.push(response.data);
            });
        }).then(() => {
            enactors.registerEnactorsWith(() => {
                this.updateAllRTUs("Write")
            });
        }).then(() => {
            this.updateIntervalID = setInterval(() => {
                this.updateAllRTUs("Read");
            }, this.updateInterval);
        });
    },

    async mounted() {
        window.root = this;
        window.bcs = bcs;
        window.enactors = enactors;
    },

    watch: {
        requestOut() {
            enactors.setClickableState(!this.requestOut);
        }
    }
}
</script>