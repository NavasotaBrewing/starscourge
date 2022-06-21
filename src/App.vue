<template>
  <w-app>

    <w-card id="main-content" class="grow" content-class="pa0">
      <w-toolbar vertical absolute left>

        <w-tooltip right align-top>
          <template #activator="{ on }">
          <a v-on="on" href="https://navasotabrewing.com" class="href" target="_blank">
            <w-image :src="'https://cdn1.iconfinder.com/data/icons/agriculture-13/48/7-512.png'" :width="45"
              :height="45">
            </w-image>
          </a>
          </template>
          Navasota Brewing Company
        </w-tooltip>


        <w-divider class="my6"></w-divider>

        <ToolbarItem linkto="/" icon="fa fa-sitemap">Home</ToolbarItem>
        <ToolbarItem linkto="/model" icon="fa fa-cubes">Models</ToolbarItem>
      </w-toolbar>
      
      <!-- <w-content> -->
        <pre>{{ activeModel.name }}</pre>
        <router-view />
      <!-- </w-content> -->
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
// import axios from "axios";
import dummy_model from "@/dummy_model.js";

export default {
    name: "AppComponent",
    components: { ToolbarItem },
    data() {
      return {
        activeModel: {},
        models: [dummy_model]
      }
    },
    methods: {
      activateModel(model) {
        this.activeModel = model;
      },
      deactivateModel() {
        this.activeModel = {};
      }
    },
    mounted() {
      window.root = this;
    }
}
</script>