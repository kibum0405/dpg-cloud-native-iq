<template>
	<div class="container" style="height: 100vh;">
		<!-- <div class="d-flex flex-column justify-space-between" >
			<div style="height:500px;">
				<img style="width:100%; height:100%;" src="./spider/image/cloudNativeIq.svg" />
			</div>
			<v-row>
				<v-col v-for="(step, index) in steps" :key="index">
					<v-card style="margin:20px 0px 20px 0px; padding:30px; text-align: center;">
						<h2>Step. {{ index + 1 }}</h2>
						<h1 style="margin-top:50px;">{{ step.name }}</h1>
						<div style="font-size:20px; margin-top:20px;">{{ step.name_en }}</div>
					</v-card>
				</v-col>
			</v-row>
			<v-row class="align-center justify-center">
				<v-btn text style="margin-bottom: 20px;">전환가이드 전체 보기</v-btn>
				<v-divider vertical></v-divider>
				<v-btn text>About</v-btn>
			</v-row>
		</div> -->

		<spiderChart 
			@changeCheckpointSave="saveToLocalStorage"
			ref="mSpiderChart"
		/>
	</div>
</template>

<script>
import spiderChart from './spider/spider-chart';

export default {
	components: {
		spiderChart,
	},
	computed: {
	},
	data() {
		return {
			steps: 
			[
				{
					name:"현 수준 평가",
					name_en:"Assessment"
				},
				{
					name:"현 수준 평가",
					name_en:"Assessment"
				},
				{
					name:"현 수준 평가",
					name_en:"Assessment"
				}
			]
		}
	},
	mounted() {
		this.loadFromLocalStorage();
	},
	methods: {
		
	},
};
</script>

<style>
</style>

