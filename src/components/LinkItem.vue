<template>
  <TypeItem class="link-item">
    <template #prepend>
      <LinkIcon />
    </template>

    <span class="link-item__label">{{ label }}</span>
  </TypeItem>
</template>

<script>
  import LinkIcon from './Icon/LinkIcon';
  import TypeItem from './TypeItem';

  export default {
    name: 'LinkItem',
    components: {
      LinkIcon,
      TypeItem,
    },
    props: {
      label: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style>
  .link-item__label {
    text-decoration: underline;
  }
</style>
