<template>
    <div v-html="markdownContent"></div>
</template>

<script>
import axios from 'axios';
import marked from 'marked';

export default {
    name: 'GetTheGuideMd',
    data() {
        return {
            markdownContent: '',
        };
    },
    methods: {
        async getMarkdownFile(filePath) {
            try {
                const response = await axios.get(`https://raw.githubusercontent.com/msa-ez/cloud-iq/main/decomposition/${filePath}`);
                this.markdownContent = marked(response.data);
            } catch (error) {
                console.error("Failed to load markdown file", error);
            }
        }
    },
    mounted() {
        this.getMarkdownFile('level3.md');
    }
};
</script>
