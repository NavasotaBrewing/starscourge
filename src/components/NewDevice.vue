<template>
    <w-card title="Add a Device" title-class="blue-light3--bg">
        <w-form v-model="formValid">
            <w-flex class="mb6">
                <div class="xs6 mr2">
                    <w-select :validators="[validators.required]" v-model="newDev.RTUID" @click="refresh()" :items="RTUs" outline>RTU*</w-select>
                </div>
                <div class="xs6 mr2">
                    <w-select :validators="[validators.required]" v-model="newDev.driver" :items="drivers" outline>Driver*</w-select>
                </div>
            </w-flex>

            <w-flex class="mb6 md">
                <div class="xs6 mr2">
                    <w-input :validators="[validators.required]" v-model="newDev.name">Name*</w-input>
                </div>
                <div class="xs3 mr2">
                    <w-input :validators="[validators.required]" v-model="newDev.controller_addr">Controller Address*</w-input>
                </div>
                <div class="xs3 mr2">
                    <w-input :validators="[validators.required]" :disabled="disableDeviceAddr()" v-model="newDev.device_addr">Device Address*</w-input>
                </div>
            </w-flex>


            <w-flex class="justify-end">
                <w-button @click="add" class="mr2" lg bg-color="success">Add</w-button>
            </w-flex>
        </w-form>
    </w-card>
</template>


<script>

import guid from "@/guid.js";

export default {
    name: "NewDevice",
    data() {
        return {
            newDev: {},
            formValid: null,
            validators: {
                required: value => !!value || 'This field is required',
            },
            RTUs: [],
            drivers: [
                { label: "Waveshare" },
                { label: "CN7500" },
                { label: "STR1" }
            ]
        }
    },
    methods: {
        refresh() {
            this.RTUs = [];
            this.$root.activeModel.RTUs.forEach(rtu => {
                this.RTUs.push({ label: rtu.name, value: rtu.id })
            });
        },
        add() {
            console.log("Adding new device");
            if (!this.formValid) {
                return;
            }

            let newDevice = {
                driver: this.newDev.driver,
                name: this.newDev.name,
                id: guid.guid(),
                state: "Off",
                addr: this.newDev.device_addr,
                controller_addr: this.newDev.controller_addr,
                pv: null,
                sv: null
            };
            this.$root.activeModel.RTUs.find((rtu) => rtu.id == this.newDev.RTUID).devices.push(newDevice);

            // TODO: Need to reset the form and refresh the table
        },
        disableDeviceAddr() {
            if (this.newDev.driver == 'CN7500') {
                this.newDev.device_addr = '0';
                return true;
            }
            return false;
        }
    },
    mounted() {
        this.refresh();
    }
}

</script>