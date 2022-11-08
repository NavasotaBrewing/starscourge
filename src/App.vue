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

            <!-- This is temporary, because we haven't configured the static IPs of the RTUs yet -->
            <w-card id="rtuAddressOverwrite">
                Temporary: put RTU IP addresses here, separated by a newline.
                <w-textarea v-model="tempRTUAddresses"></w-textarea>
                <w-button @click="findRTUs" class="mt2">Find</w-button>
            </w-card>

            <router-view />
            <!-- <pre>{{ RTUs }}</pre> -->


        </w-card>

        <div id="footer" w-flex>
            last updated: {{ lastUpdate }}
        </div>


    </w-app>
</template>

<style scoped>
#main-content {
    /* Adds margin to clear the toolbar */
    padding-left: 80px;
    padding-top: 20px;
}

#rtuAddressOverwrite {
    width: 30vw;
}

#footer {
    padding-left: 1em;
    padding-right: 1em;
    height: 25px;
    position: absolute;
    width: calc(100vw - 60px);
    left: 60px;
    bottom: 0;
    border-top: 1px solid #D9D9D9;
    text-align: right;
    background-color: white;
}
</style>

<script>
import ToolbarItem from '@/components/ToolbarItem.vue';
import bcs from "@/bcs.js";
import enactors from "@/enactors.js";
import moment from "moment";

export default {
    name: "AppComponent",
    components: { ToolbarItem },

    data() {
        return {
            RTUs: [],
            requestOut: false,
            updateIntervalID: null,
            // 10_000 = 10 seconds
            updateInterval: 10_000,
            lastUpdate: moment().format('hh:mm:ss'),
            paused: true,
            tempRTUAddresses: "0.0.0.0",
        }
    },

    methods: {
        // Initializes the whole system
        initialize() {
            Promise.all(
                // Send requests to all RTUs on the list to see if they response
                bcs.RTU_addresses.map((addr) => bcs.findRTUAt(addr))
            ).then((results) => {
                results.forEach(response => {
                    this.RTUs.push(response.data);
                });
            }).then(() => {
                // Enable all enactor buttons to send a request to {iris}/enact
                enactors.registerEnactorsWith(() => {
                    this.updateAllRTUs("Write")
                });
            }).then(() => {
                // Set an interval ID to update every few seconds
                this.updateIntervalID = setInterval(() => {
                    if (!this.paused) {
                        this.updateAllRTUs("Read");
                        this.lastUpdate = moment().format('hh:mm:ss');
                    }
                }, this.updateInterval);
            }).then(() => {
                this.updateAllRTUs();
            });
        },

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
                    console.log(response);
                    this.RTUs[index] = response.data;
                    this.requestOut = false;
                });
            });
        },

        // This is temporary, until we can get the static RTU IP addresses set
        findRTUs() {
            // bcs.RTU_addresses = this.tempRTUAddresses.split("\n");
            // this.initialize();
        }
    },

    async created() {
        // System Initialization
        this.initialize();
    },

    async mounted() {
        // Setting the page title here because I can't figure out the right way to change it?
        document.title = "BCS Dashboard";
        window.root = this;
        window.bcs = bcs;
    },

    watch: {
        requestOut() {
            enactors.setClickableState(!this.requestOut);
        }
    }
}
</script>