<template>
    <div>
        <v-row>
            <v-col>
                <div v-for="(topic, topicIndex) in topics" :key="topicIndex">
                    <h3>{{ topic.name }}</h3>
                    <div v-for="(question, questionIndex) in topic.questions" :key="questionIndex">
                        <div>{{ question.text }}</div>
                        <v-slider
                            v-model="question.value"
                            :tick-labels="tickLabels"
                            :max="tickLabels.length - 1"
                            step="1"
                            ticks="always"
                            :tick-size="4"
                        ></v-slider>
                    </div>
                </div>
            </v-col>
            <v-col>
                <SpiderChart
                    :perspectives="perspectives"
                    :chartWidth="chartWidth"
                    :chartHeight="chartHeight"
                    :chartCenterX="chartCenterX"
                    :chartCenterY="chartCenterY"
                    :chartRadius="chartRadius"
                    :labelOffset="labelOffset"
                    :maxDataValue="maxDataValue"
                    :pointRadius="pointRadius"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import SpiderChart from './SpiderChart.vue'

export default {
    name: "GoalSetting",
    components: {
        SpiderChart
    },
    data () {
        return {
            perspectives: [],
            chartWidth: 400,
            chartHeight: 400,
            chartCenterX: 200,
            chartCenterY: 200,
            chartRadius: 150,
            labelOffset: 20,
            maxDataValue: 5,
            pointRadius: 4,
            tickLabels: [
                '전혀 그렇지 않다.',
                '그렇지 않다.',
                '보통이다.',
                '그렇다.',
                '매우 그렇다.'
            ],
            topics: [
                {
                    name: '가용성 측면',
                    questions: [
                        {
                            text: '가용성 측면에 대한 질문 1',
                            value: null
                        },
                        {
                            text: '가용성 측면에 대한 질문 2',
                            value: null
                        },
                    ]
                },
                {
                    name: '업무 간섭 / 이해의 문제',
                    questions: [
                        {
                            text: '업무 간섭 / 이해의 문제에 대한 질문 1',
                            value: null
                        },
                    ]
                },
            ],
        }
    },
    created() {
        this.loadPerspectives();
    },
    watch: {
    },

    methods: {
        loadPerspectives() {
            const storedPerspectives = localStorage.getItem('perspectives');
            if (storedPerspectives) {
                this.perspectives = JSON.parse(storedPerspectives);
            }
        },
    },
}
</script>