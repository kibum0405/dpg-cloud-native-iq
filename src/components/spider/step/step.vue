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
                    <div>
                        <div>Step {{ n }}</div>
                        <div>{{ components[n - 1].name }}</div>
                    </div>
                    </v-stepper-step>
        
                    <v-divider
                        v-if="n !== components.length"
                        :key="n"
                    ></v-divider>
                </template>
            </v-stepper-header>
  
            <v-stepper-items class="step-box">
                <v-stepper-content
                    v-for="n in components.length"
                    :key="`${n}-content`"
                    :step="n"
                >
                    <v-card class="mb-12"> <!-- step-box 안의 흰 박스 -->
                        <component :is="components[n - 1].component" />
                    </v-card>
                    <div style="text-align: right;">
                        <v-btn color="primary" @click="nextStep(n)">Next</v-btn>
                        <v-btn text>Cancel</v-btn>
                    </div>
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
            components: [
                { component: Assessment, name: '현수준평가' },
                { component: GoalSetting, name: '목표수준설정' },
                { component: GetTheGuide, name: '전환가이드' }
            ],
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

<style>
/* .step-box {
    background-color: lightgoldenrodyellow;
} */
.qna-box {
    width: 130%;
	height: 100vh;
	overflow: auto;
    padding-right: 20px;
	/* border: 1px solid pink; */
}

@media only screen and (max-width:1100px) {
  .qna-box {
    width: 100%;
  }
}
@media only screen and (max-width:700px) {
  .qna-box {
    height: 50vh;
  }
}
</style>