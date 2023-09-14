<template>
    <w-flex>
        <div class="lg3">
            <w-card title="Scenes" class="ma2" title-class="deep-purple-light4--bg">
                <w-flex>
                    <w-list
                        :item-class="'title3'"
                        v-model="selectedSceneID"
                        :items="sceneNamesAndIds()"
                        color="deep-purple"
                        class="mt2 grow">
                    </w-list>
                </w-flex>
                
                <w-flex class="mt5">
                    <w-input v-model="newSceneName" bg-color="deep-purple-light5">New Scene Name</w-input>
                    <w-button class="mx2 mt3 flex justify-end" bg-color="deep-purple-light5" @click="newScene" lg>New</w-button>
                </w-flex>
                <template #actions>
                    <div class="spacer"></div>
                    <w-button class="mx2" bg-color="deep-purple-light5" @click="enactScene" lg>Enact</w-button>
                    <w-button class="mx2" bg-color="success-light3" @click="saveScene" lg>Save</w-button>
                </template>
            </w-card>
        </div>
        <div class="lg9">
            <RTUControlPanel v-for="rtu in currentScene.rtus" :key="rtu.id" :rtu="rtu" @deviceEnacted="updateSceneRTUDeviceState($event, rtu.id)" />
        </div>
    </w-flex>
</template>

<style scoped>
</style>

<script>
import db from "@/db.js";
import RTUControlPanel from "@/components/RTUControlPanel.vue";

export default {
    name: 'ScenesComponent',
    components: { RTUControlPanel },
    data() {
        return {
            scenes: [],
            currentScene: {},
            selectedSceneID: null,
            newSceneName: ''
        }
    },
    methods: {
        sceneNamesAndIds() {
            let scenes = [];
            this.scenes.forEach((scene) => {
                scenes.push({ label: scene.name, value: scene.id });
            });
            return scenes;
        },

        updateSceneRTUDeviceState(event, rtu_id) {
            let rtu = this.currentScene.rtus.find(rtu => rtu.id == rtu_id);
            let device = rtu.devices.find(device => device.id == event.id);
            device.state = event.new_state;
        },

        saveScene() {
            db.updateScene(this.currentScene.id, this.currentScene).then(() => {
                this.$root.$waveui.notify('Scene saved', 'success');
            });
        },

        enactScene() {
            if (this.currentScene.name == null) {
                return;
            }

            this.$root.$waveui.notify('Enacting scene...');
            this.currentScene.rtus.forEach(rtu => {
                this.$root.bcs.enactRTU(rtu);
            })
        },

        newScene() {
            if (this.newSceneName == "") {
                this.$root.$waveui.notify("Scene needs a name", 'error');
                return;
            }

            db.createScene({
                name: this.newSceneName,
                description: '',
                rtus: this.$root.allRTUs()
            }).then(scene => {
                this.newSceneName = "";
                this.scenes.push(scene);
            })
        }
    },
    mounted() {
        db.getScenes().then((resp) => {
            this.scenes = resp;
        });

        window.scenes_app = this;
    },
    watch: {
        selectedSceneID: function() {
            if (!this.selectedSceneID) {
                this.currentScene = {};
                return;
            }
            this.currentScene = this.scenes.find(scene => scene.id == this.selectedSceneID);
        }
    }
}
</script>
