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

                <ToolbarItem linkto="/" icon="fa fa-sitemap">Home</ToolbarItem>
                <ToolbarItem linkto="/model" icon="fa fa-cubes">RTUs</ToolbarItem>
            </w-toolbar>

            <!-- <w-content> -->
            <router-view />
            <pre>{{ RTUs }}</pre>
            <!-- </w-content> -->
        </w-card>



    </w-app>data
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
// import axios from "axios";
// import db from "@/db.js";
import bcs from "@/bcs.js";

export default {
    name: "AppComponent",
    components: { ToolbarItem },
    data() {
        return {
            RTUs: []
        }
    },
    methods: {

    },
    async mounted() {
        window.root = this;
        
        bcs.RTU_addresses.forEach(async (addr) => {
            this.RTUs.push(await bcs.find_rtu_at(addr));
        })
    }
}
</script>