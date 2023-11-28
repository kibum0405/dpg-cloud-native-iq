<template>
    <div>
        <!-- <div v-for="folder in folders" :key="folder.name">
            <h2>{{ folder.name }}</h2>
            <div v-for="file in folder.files" :key="file.level">
                <h3>Level {{ file.level }}</h3>
                <div v-html="file.markdownContent"></div>
            </div>
        </div> -->
        <div v-html="content"></div>
    </div>
</template>

<script>
import axios from 'axios';
import marked from 'marked';

export default {
    name: 'GetTheGuideMd',
    props: {
        selectedUser: null,
    },
    data() {
        return {
        };
    },
    
};
</script>
