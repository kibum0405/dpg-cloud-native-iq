<template>
    <div>
        <v-tabs
            v-model="tab"
            fixed-tabs
        >
        <v-tab
            v-for="item in items"
            :key="item.tab"
        >
            {{ item.tab }}
        </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="item in items"
                :key="item.tab"
            >
                <v-card flat>
                    <template v-for="content in item.content">
                        <v-card-text>{{ content.text }}</v-card-text>
                    </template>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>

export default {
    name: "GetTheGuide",
    comments: {
    },
    data () {
        return {
        tab: null,
        items: [
            { 
                tab: '기능분해',
                content: [
                    {
                        text: 'Ubiquitous language 정의: 각 bounded context에서 사용될 공통 언어와 용어를 정의하고 이를 문서화하였는가?'
                    },
                    {
                        text: 'Boundary 정의: 각 bounded context의 경계를 명확하게 정의하고 외부에서의 커뮤니케이션 방식을 결정하였는가?'
                    },
                    {
                        text: 'Anti-corruption layer 구현: bounded context 간의 통신을 관리하기 위해 Anti-corruption layer를 구현하고 외부 인터페이스 변환 및 데이터 변환을 수행하였는가?'
                    },
                    {
                        text: 'Ubiquitous language 정의: 각 bounded context에서 사용될 공통 언어와 용어를 정의하고 이를 문서화하였는가?'
                    },
                ]
            },
            { 
                tab: '데이터',
                content: [
                    {
                        text: 'Ubiquitous language 정의: 각 bounded context에서 사용될 공통 언어와 용어를 정의하고 이를 문서화하였는가?'
                    },
                    {
                        text: 'Boundary 정의: 각 bounded context의 경계를 명확하게 정의하고 외부에서의 커뮤니케이션 방식을 결정하였는가?'
                    },
                    {
                        text: 'Anti-corruption layer 구현: bounded context 간의 통신을 관리하기 위해 Anti-corruption layer를 구현하고 외부 인터페이스 변환 및 데이터 변환을 수행하였는가?'
                    },
                    {
                        text: 'Ubiquitous language 정의: 각 bounded context에서 사용될 공통 언어와 용어를 정의하고 이를 문서화하였는가?'
                    },
                ]
            },
        ],
      }
    },

    watch: {
    },

    methods: {
    },
}
</script>