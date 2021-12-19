<template>
  <div>
    <div>Micro Fe - template</div>
    <News />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import News from './News.vue'
export default defineComponent({
  components: {
    News
  }
})
</script>