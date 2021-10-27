<template>
  <div class="type-item">
    <span v-if="$slots.prepend" class="type-item__prepend">
      <slot name="prepend"></slot>
    </span>

    <span class="type-item__label">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'TypeItem',
    props: {
      label: {
        type: String,
        default: null,
      },
    },
  };
</script>

<style>
  .type-item {
    display: flex;
    align-items: center;
  }

  .type-item__prepend {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    color: #ababab;
  }
</style>
