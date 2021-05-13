<template>
  <div class="vik-input">
    <input />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'vik-input',
  setup() {
      onMounted(() => {
        console.log('onMounted');
      });
  },
})
</script>
<style lang="less" scoped>
@import './index.less';
</style>
<style lang="scss" scoped>
@import './index.scss';
</style>
