<template>
    <w-flex>
        <div class="lg3">
            <w-card title="Scenes" class="ma2" title-class="deep-purple-light4--bg">
                <w-flex>
                    <w-list
                        :item-class="'title3'"
                        v-model="selectedScene"
                        :items="sceneNamesAndIds()"
                        color="deep-purple"
                        class="mt2 grow">
                    </w-list>
                </w-flex>
            </w-card>
        </div>
        <div class="lg9">
        </div>
    </w-flex>
</template>

<style scoped>
</style>

<script>
import db from "@/db.js";

export default {
    name: 'ScenesComponent',
    components: { },
    data() {
        return {
            scenes: [],
            selectedScene: null,
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
    },
    mounted() {
        db.getScenes().then((resp) => {
            this.scenes = resp;
        });

        window.scenes_app = this;
    }
}
</script>
