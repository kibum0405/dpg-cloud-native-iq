<template>
	<div>
		<v-row>
			<v-col>
				<div class="qna-box assess-box">
					<div v-for="(perspective, index) in perspectives" :key="index" style="margin-bottom: 40px;">
						<h2 style="margin-bottom: 20px;">{{ perspective.name }}</h2>
						<div v-for="(level, levelIndex) in perspective.levels" :key="levelIndex">
							<h3 style="margin-bottom: 10px;">Level {{ levelIndex + 1 }}</h3>
							<div style="margin-bottom: 20px;">
								<label v-for="(checkpoint, checkpointIndex) in level.checkpoints" :key="checkpointIndex">
									<div style="display:flex; align-items: start; margin-left: 15px;line-height: 1.7;">
										<input type="checkbox" v-model="checkpoint.checked" @change="updateLevelCompletion(perspective, level)"
										style="margin: 7px 5px 0 0;">
										<span style="color: black">{{ checkpoint.text }}</span>
									</div>
								</label>
							</div>
						</div>
					</div>
				
					<div>
						<h2>Result</h2>
						<p v-if="isAllLevelsCompleted">All levels are completed!</p>
						<p v-else>Some levels are not completed.</p>
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
import AssessmentData from '@/components/spider/step/AssessmentData'

export default {
	mixins: [
		AssessmentData
	],
    components: {
        SpiderChart,
    },
    props: {

    },
	data() {
        return {
            
        }
	},
	mounted() {
		this.getPerspectives();
	},
	watch: {
        perspectives: {
			handler(newVal) {
				localStorage.setItem('perspectives', JSON.stringify(newVal));
				this.$bus.$emit('perspectivesUpdated', newVal);
			},
			deep: true
		}
    },
	methods: {
		getPerspectives() {
            const storedPerspectives = localStorage.getItem('perspectives');
            if (storedPerspectives) {
                this.perspectives = JSON.parse(storedPerspectives);
            }
        },
		updateLevelCompletion(perspective, level) {
			level.isCompleted = level.checkpoints.every(checkpoint => checkpoint.checked);
		},
	}
};
</script>
  