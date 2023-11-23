<template>
    <div>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <template v-for="n in components.length">
                    <v-stepper-step
                        :key="`${n}-step`"
                        :complete="e1 > n"
                        :step="n"
                        editable
                    >
                        Step {{ n }}
                    </v-stepper-step>
        
                    <v-divider
                        v-if="n !== components.length"
                        :key="n"
                    ></v-divider>
                </template>
            </v-stepper-header>
  
            <v-stepper-items>
                <v-stepper-content
                    v-for="n in components.length"
                    :key="`${n}-content`"
                    :step="n"
                >
                    <v-card class="mb-12">
                        <component :is="components[n - 1]" />
                    </v-card>

                    <v-btn color="primary" @click="nextStep(n)">Next</v-btn>
                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
import Assessment from './Assessment';
import GoalSetting from './GoalSetting';
import GetTheGuide from './GetTheGuide';

export default {
    data () {
        return {
            e1: 1,
            components: [Assessment, GoalSetting, GetTheGuide],
        }
    },

    watch: {
    },

    methods: {
        nextStep (n) {
            if (n === this.components.length) {
                this.e1 = 1
            } else {
                this.e1 = n + 1
            }
        },
    },
}
</script>