<template>
  <TypeItem class="folder-item" :label="label">
    <template #prepend>
      <component :is="iconComponent" />
    </template>
  </TypeItem>
</template>

<script>
  import FolderIcon from './Icon/FolderIcon';
  import FolderOpenIcon from './Icon/FolderOpenIcon';
  import TypeItem from './TypeItem';

  export default {
    name: 'FolderItem',
    components: {
      FolderIcon,
      FolderOpenIcon,
      TypeItem,
    },
    props: {
      label: {
        type: String,
        required: true,
      },
      isExpanded: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      iconComponent() {
        return this.isExpanded ? 'FolderOpenIcon' : 'FolderIcon';
      },
    },
  };
</script>

<style>
  .folder-item {
    font-weight: 700;
  }
</style>
