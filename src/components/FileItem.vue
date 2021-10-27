<template>
  <TypeItem class="file-item" :label="label">
    <template #prepend>
      <AttachIcon />
    </template>
  </TypeItem>
</template>

<script>
  import AttachIcon from './Icon/AttachIcon';
  import TypeItem from './TypeItem';

  export default {
    name: 'FileItem',
    components: {
      AttachIcon,
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
