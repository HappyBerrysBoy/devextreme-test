<template>
  <div>
    <div class="shortCutMenu" icon="save">
      <!-- <img :src="item.ImageSrc"> -->
      <div>{{ item.Menu }}</div>
      <!-- <div class="price">{{ currency(item.Price) }}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {},
};
</script>
