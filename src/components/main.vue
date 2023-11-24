<template>
	<div style="width:100%;height: 100%;">
		<div class="flex-column">
			<div style="text-align: center;">
				<!-- <img style="width:800px; height:500px;" src="../image/DPG_logo.png" /> -->
				<img style="height: calc(50vh - 36px);" src="../image/DPG_logo.png" />
			</div>
			<v-row>
				<v-col v-for="(step, index) in steps" :key="index">
					<v-card @click="goToStep(step.name_en)" style="margin:40px 20px 20px 20px; padding:30px; text-align: center;">
						<h2>Step. {{ index + 1 }}</h2>
						<h1 style="margin-top:50px;">{{ step.name }}</h1>
						<div style="font-size:20px; margin-top:20px;">{{ step.name_en }}</div>
					</v-card>
				</v-col>
			</v-row>
			<div class="flex-grow-1"></div> 
			<v-row class="align-left justify-left" style="height:36px;">
				<v-btn text>전환가이드 전체 보기</v-btn>
				<v-divider vertical class="mx-2"></v-divider> 
				<v-btn text>About</v-btn>
			</v-row>
		</div>
	</div>
</template>

<script>
export default {
	components: {
	},
	computed: {
	},
	data() {
		return {
			steps: 
			[
				{
					name: "현 수준 평가",
					name_en: "Assessment",
				},
				{
					name: "목표수준 설정",
					name_en: "Goal Setting",
				},
				{
					name: "전환 가이드",
					name_en: "Get the Guide",
				}
			]
		}
	},
	mounted() {
	},
	methods: {
		goToStep(stepName) {
			this.$router.push({ path: `/step/${stepName}` });
		}
	},
};
</script>

<style>
</style>

