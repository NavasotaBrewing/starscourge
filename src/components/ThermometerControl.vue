<template>
    <div class="container">
        <div class="ribbon">
            <div class="label">{{ thermo.name }}</div>
        </div>
        <div class="body">
            <div class="upper">
                <div class="upper-left">
                    <div class="actual-label">
                        Actual
                    </div>
                    <div class="actual-temp">
                        {{ asFloat(thermo.state.pv) }} F
                    </div>
                </div>
                <div class="upper-right">
                    <div class="switch">
                        <RelaySwitch hideLabel="true" :device="thermo"></RelaySwitch>
                    </div>
                </div>
            </div>
            <div class="bar">
                <div class="temp-slider"></div>
            </div>
            <div class="lower">

            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        width: 500px;
        height: 300px;
    }

    .ribbon {
        height: 18%;
    }

    .label {
        width: 200px;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 22px;
        border: 2px solid black;
        border-bottom: none;
    }

    .body {
        width: 100%;
        height: 82%;

        border: 2px solid black;
    }

    .upper {
        height: 40%;
    }

    .upper-left {
        display: inline-block;


        width: 50%;
        height: 100%;

        padding: 1.5em;
    }

    .actual-label {
        font-size: 16px;
    }

    .actual-temp {
        font-size: 32px;
        font-weight: 500;
        line-height: 110%;
    }

    .upper-right {
        float: right;
        width: 50%;
        height: 100%;
        border: 1px solid teal;
    }

    .switch {
        width: 120px !important;
    }

    .bar {
        height: 10%;
        border-bottom: 2px solid black;

        display: flex;
    }

    .temp-slider {
        background-color: #819BF4;

        /* This will get calculated based on temp */
        width: 63%;
        height: 5px;

        align-self: flex-end;
    }

    .lower {
        height: 50%;
    }

</style>

<script>
import RelaySwitch from "@/components/RelaySwitch.vue";
export default {
    name: 'ThermometerControl',
    props: ['thermo'],
    components: { RelaySwitch },
    data() {
        return {}
    },
    methods: {
        asFloat(value) {
            return parseFloat(value).toFixed(1);
        }
    }
}
</script>
