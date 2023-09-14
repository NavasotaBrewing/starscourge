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
                <ToolbarItem linkto="/scenes" icon="fa fa-code-fork">Scenes</ToolbarItem>
            </w-toolbar>

            <router-view @deviceEnacted="enactDevice($event)" />


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
import BCS from "@/bcs/bcs.js";
import moment from "moment";
import db from "@/db.js";

export default {
    name: "AppComponent",
    components: { ToolbarItem },

    data() {
        return {
            RTUs: [],
            sockets: {},
            lastUpdate: moment().format('hh:mm:ss'),
            // The BCS sends out lock/unlock events.
            // We shouldn't send any event in the interval between a lock and unlock.
            // We use this flag to change UI styles and prevent clicks/sending events.
            locked: false
        }
    },

    methods: {
        // Initializes the whole system
        initialize() {
            this.bcs = new BCS(this);
        },

        isLocked() {
            return this.locked;
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

        // Apply the given function to a device with the given ID
        mapDevice(id, func) {
            let device = this.findDevice(id);
            func(device);
        },

        enactDevice(event) {
            let device = this.findDevice(event.id);
            device.state = event.new_state;
            this.bcs.enactDevice(device.id);
        }
    },

    async created() {
        // System Initialization
        this.initialize();
    },

    async mounted() {
        // Setting the page title here because I can't figure out the right way to change it?
        document.title = "BCS Dashboard";
        window.app = this;
        window.db = db;
    }
}
</script>
