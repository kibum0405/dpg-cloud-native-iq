<template>
	<div class="container">
	  <div class="checkpoints-container" style="height:100vh; overflow:auto;">
		<div v-for="(perspective, index) in perspectives" :key="index" style="padding:16px">
		  <h2>{{ perspective.name }}</h2>
		  <div v-for="(level, levelIndex) in perspective.levels" :key="levelIndex">
			<h3 style="margin-bottom:4px;">Level {{ levelIndex + 1 }} :{{ level.name }}</h3>
			  <label style="background-color:yellow;" v-for="(checkpoint, checkpointIndex) in level.checkpoints" :key="checkpointIndex">
			  <div style="display:flex;">
				<input type="checkbox" v-model="checkpoint.checked" @change="updateLevelCompletion(perspective, level)">
				<div>{{ checkpoint.text }}</div>
			  </div>
			</label>
		  </div>
		</div>
  
		<div style="padding:0px 16px 10px 16px;">
		  <h2 style="margin-bottom:4px;">Result</h2>
		  <div v-if="isAllLevelsCompleted">All levels are completed!</div>
		  <div v-else>Some levels are not completed.</div>
		</div>
	  </div>
  
	  <div class="chart-container" style="background-color:red">
		<svg :width="chartWidth" :height="chartHeight" style="background-color:yellow; margin-top:20px;">
		  <g :transform="`translate(${chartCenterX}, ${chartCenterY})`">
			<!-- Draw axes -->
			<g v-for="(axis, index) in chartData.labels" :key="index">
			  <line
				:x1="0"
				:y1="0"
				:x2="getCoordinate(chartRadius, index, chartData.labels.length)[0]"
				:y2="getCoordinate(chartRadius, index, chartData.labels.length)[1]"
				stroke="lightgray"
			  />
			  <text
				:x="getCoordinate(chartRadius + labelOffset, index, chartData.labels.length)[0]"
				:y="getCoordinate(chartRadius + labelOffset, index, chartData.labels.length)[1]"
				dominant-baseline="middle"
				text-anchor="middle"
			  >
				{{ axis }}
			  </text>
			</g>
  
			<!-- Draw data points -->
			<g>
			  <polygon
				:points="getPolygonPoints(chartData.data)"
				fill="rgba(75, 192, 192, 0.2)"
				stroke="rgba(75, 192, 192, 1)"
			  />
			  <polygon
				:points="getPolygonPoints(chartData.data2)"
				fill="rgba(192, 75, 192, 0.2)"
				stroke="rgba(192, 75, 192, 1)"
			  />
			  <circle
				v-for="(dataPoint, index) in chartData.data"
				:key="index"
				:cx="getCoordinate(chartRadius * (dataPoint / maxDataValue), index, chartData.data.length)[0]"
				:cy="getCoordinate(chartRadius * (dataPoint / maxDataValue), index, chartData.data.length)[1]"
				:r="pointRadius"
				fill="rgba(75, 192, 192, 1)"
			  />
			  <circle
				v-for="(dataPoint, index) in chartData.data2"
				:key="index"
				:cx="getCoordinate(chartRadius * (dataPoint / maxDataValue), index, chartData.data2.length)[0]"
				:cy="getCoordinate(chartRadius * (dataPoint / maxDataValue), index, chartData.data2.length)[1]"
				:r="pointRadius"
				fill="rgba(192, 75, 192, 1)"
			  />
			</g>
		  </g>
		</svg>
	  </div>
	</div>
  </template>
  
  <script>
  
  
  export default {
  
	data() {
	  return {
		 isAllLevelsCompleted: false,
		  perspectives: [
		  {
			name: '기능분해관점 체크포인트',
			levels: [
			  {
				checkpoints: [
					{ name: '기능과 유즈케이스 단위로 분리'},
				  { text: '비즈니스 역량 도출: 비즈니스 도메인을 분석하여 주요 기능과 유즈케이스를 도출하였는가?', checked: false },
				  { text: '기능 정의: 각 기능을 명확하게 정의하고 해당 기능의 범위를 결정하였는가?', checked: false },
				  { text: '유즈케이스 식별: 각 기능에 대한 유즈케이스를 식별하고 이를 단위로 분리하였는가?', checked: false },
				  { text: '의존성 분석: 각 기능과 유즈케이스 간의 의존성을 분석하여 적절한 분리 수준을 결정하였는가?', checked: false },
				],
				isCompleted: false,
			  },
			  {
				checkpoints: [
				  { text: '인터페이스 설계: 각 유즈케이스와 관련된 데이터에 대한 인터페이스를 정의하고 필요한 메소드와 매개변수를 명시하였는가?', checked: false },
				  { text: '데이터 액세스 계획: 각 유즈케이스에서 필요한 데이터 액세스 방법을 계획하고 이를 인터페이스에 반영하였는가?', checked: false },
				  { text: '보안 및 인증 고려: 서비스 간의 인터페이스에서 보안 및 인증 요구사항을 고려하여 액세스 제어 방법을 정의하였는가?', checked: false },
				  { text: '에러 핸들링 정의: 인터페이스에서 발생할 수 있는 예외 상황에 대한 처리 방법과 오류 핸들링 전략을 정의하였는가?', checked: false },
				],
				isCompleted: false,
			  },
			  {
				checkpoints: [
				  { text: 'Ubiquitous language 정의: 각 bounded context에서 사용될 공통 언어와 용어를 정의하고 이를 문서화하였는가?', checked: false },
				  { text: 'Boundary 정의: 각 bounded context의 경계를 명확하게 정의하고 외부에서의 커뮤니케이션 방식을 결정하였는가?', checked: false },
				  { text: 'Anti-corruption layer 구현: bounded context 간의 통신을 관리하기 위해 Anti-corruption layer를 구현하고 외부 인터페이스 변환 및 데이터 변환을 수행하였는가?', checked: false },
				  { text: '도메인 이벤트 식별: bounded context 간에 필요한 도메인 이벤트를 식별하고 이를 통해 비동기적인 상호작용을 구현하였는가?', checked: false },
				],
				isCompleted: false,
			  },
			  {
				checkpoints: [
				  { text: 'CQRS 모델 설계: 읽기와 쓰기를 위한 별도의 모델을 설계하고 도메인 이벤트를 활용하였는가?', checked: false },
				  { text: '이벤트 스토리지 구현: 도메인 이벤트를 저장하고 관리하기 위한 이벤트 스토리지를 구현하였는가?', checked: false },
				  { text: '이벤트 드리븐 아키텍처 구축: 도메인 이벤트를 기반으로 비즈니스 로직을 처리하는 이벤트 드리븐 아키텍처를 구축하였는가?', checked: false },
				  { text: '이벤트 버전 관리: 도메인 이벤트의 버전을 관리하고 업데이트할 수 있는 메커니즘을 도입하였는가?',checked: false },
				  { text: '이벤트 소싱 및 재생: 이벤트 소싱을 통해 시스템 상태를 재생하고 이벤트 스트림을 통해 상태 변경을 추적하였는가?',checked: false },
				],
				isCompleted: false,
			  },
			],
		  },
		  {
			name: '데이터 관점 체크포인트',
			levels: [
			  {
				checkpoints: [
				  { text: '트랜잭션 관리: 각 마이크로서비스에서 ACID 기반의 트랜잭션을 유지하기 위한 방법과 프레임워크를 도입하였는가?', checked: false },
				  { text: '데이터 일관성 유지: Canonical Data Model을 도입하여 데이터의 일관성을 유지하고 데이터의 중복 및 모순을 방지하였는가?', checked: false },
				],
				isCompleted: false,
			  },
			  {
				checkpoints: [
				  { text: '개별 스키마 정의: 각 마이크로서비스는 자체적인 스키마를 가지고 있으며, 각 서비스의 데이터 구조와 필드 정의가 명확하게 이루어졌는가?', checked: false },
				  { text: '다중 엔터프라이즈 데이터 조정: 서비스 간의 다중 엔터프라이즈 데이터 저장소와의 트랜잭션 조정 방식을 정의하고 이를 구현하였는가?', checked: false },
				  { text: '데이터 일관성 유지: 데이터 조정 및 동기화 과정에서 데이터 일관성을 유지하기 위한 메커니즘을 도입하였는가?', checked: false },
				],
				isCompleted: false,
			  },
			  {
				checkpoints: [
				  { text: '분산 데이터 관리: 각 마이크로서비스는 완전히 분산된 데이터 관리를 수행하고 있으며, 필요에 따라 데이터의 파티셔닝, 샤딩, 복제 등을 구현하였는가?', checked: false },
				  { text: '폴리글랏 퍼시스턴스: 각 마이크로서비스는 자체적으로 다른 유형의 DBMS를 사용할 수 있는 폴리글랏 퍼시스턴스를 구현하였는가?', checked: false },
				  { text: '데이터 접근 및 관리: 각 마이크로서비스에서 필요한 데이터 액세스 방법을 선택하고 이를 효율적으로 관리하고 있으며, 성능과 확장성을 고려하였는가?', checked: false },
				],
				isCompleted: false,
			  },
			  {
				checkpoints: [
				  { text: '이벤트 기반 데이터 관리: 이벤트 중심 아키텍처를 구축하여 각 마이크로서비스 간의 데이터 흐름을 이벤트 기반으로 관리하고 있는가?', checked: false },
				  { text: '이벤트 소싱 및 커맨드-쿼리 분리(CQRS): 이벤트 소싱을 통해 시스템의 상태를 재생하고 커맨드와 쿼리를 분리하여 비동기적인 데이터 처리를 구현하였는가?', checked: false },
				  { text: '데이터 일관성 관리: 일시적으로 데이터에 일관성이 없는 상태가 존재할 수 있으며, 이를 일정 시간 내에 해소하여 다시 일관성을 충족시키는 메커니즘을 구현하였는가?', checked: false },
				],
				isCompleted: false,
			  },
			],
		  },
		  // Add more perspectives here if needed
		],
  
		chartData: {
		  labels: ['기능분해', '데이터', 'SW 아키텍처', 'Infra', '스트럭처', '배포', '팀구조'],
		  data: [0, 0, 0, 0, 0, 0, 0],
		  data2: [0, 0, 0, 0, 0, 0, 0],
		},
		chartWidth: 400,
		chartHeight: 400,
		chartCenterX: 200,
		chartCenterY: 200,
		chartRadius: 150,
		labelOffset: 20,
		maxDataValue: 5,
		pointRadius: 4,
	  };
	},
	methods: {
	  getCoordinate(radius, index, total) {
		const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
		const x = radius * Math.cos(angle);
		const y = radius * Math.sin(angle);
		return [x, y];
	  },
	  getPolygonPoints(data) {
		return data
		  .map((dataPoint, index) => {
			const radius = this.chartRadius * (dataPoint / this.maxDataValue);
			return this.getCoordinate(radius, index, data.length).join(',');
		  })
		  .join(' ');
	  },
	  updateLevelCompletion(perspective, level) {
		level.isCompleted = level.checkpoints.every(checkpoint => checkpoint.checked);
		this.checkAllLevelsCompletion(perspective);
	  },
   checkAllLevelsCompletion(perspective) {
	perspective.isCompleted = perspective.levels.every((level) => level.isCompleted);
  
  //  if (perspective.isCompleted) {
	  const perspectiveIndex = this.chartData.labels.findIndex((label) => label === perspective.name);
	  if (perspectiveIndex !== -1) {
		const lastCompletedLevelIndex = perspective.levels.findIndex((level) => !level.isCompleted) - 1;
		const value = lastCompletedLevelIndex !== -1 ? lastCompletedLevelIndex + 1 : this.chartData.labels.length;
		this.chartData.data[perspectiveIndex] = value;
		this.chartData.data2[perspectiveIndex] = value;
	  }
	//}
  },
	}
  };
  </script>
  
  <style>
  
  .container {
	display: flex;
	justify-content: space-between;
  }
  
  .checkpoints-container {
	flex: 1;
  }
  
  .chart-container {
	flex: 1;
  }
  svg {
	display: block;
	margin: auto;
  }
  </style>
  
  