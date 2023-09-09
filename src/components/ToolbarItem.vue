<template>
    <router-link :to="linkto">
        <w-tooltip right align-top>
            <template #activator="{ on }">
                <w-button v-on="on" :icon="icon" text xl class="pa4 my4"></w-button>
            </template>
            <slot></slot>
        </w-tooltip>
    </router-link>
</template>

<script>

export default {
    name: "ToolbarItem",
    props: ['linkto', 'icon'],
    data() {
        return {}
    }
}

</script>
