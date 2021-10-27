<template>
  <div
    ref="node"
    class="tree-view-node"
    :class="{
      'tree-view-node_unselected': !isSelected,
      'tree-view-node_selected': isSelected,
    }"
    :style="nodeIndentStyles"
    tabindex="0"
    @click="_emitSelect()"
    @keypress.enter="_emitSelect()"
    @keydown.up.prevent="_emitFocusPrev()"
    @keydown.down.prevent="_emitFocusNext()"
  >
    <div class="tree-view__label">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TreeViewNode',
    props: {
      label: {
        type: String,
        required: true,
      },
      indent: {
        type: Number,
        default: 0,
      },
      isSelected: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      nodeIndentStyles() {
        return { 'padding-left': `${this.indent * 2}rem` };
      },
    },
    methods: {
      _emitSelect() {
        this.$emit('select');
      },
      _emitFocusPrev() {
        this.$emit('focus-prev');
      },
      _emitFocusNext() {
        this.$emit('focus-next');
      },

      focus() {
        this.$refs.node.focus();
      },
    },
  };
</script>

<style>
  .tree-view-node {
    cursor: pointer;
    user-select: none;
    outline: none;
  }

  .tree-view-node_unselected:hover,
  .tree-view-node_unselected:focus {
    background-color: #f3f3f3;
  }

  .tree-view-node_selected {
    background-color: #d7f5cb;
  }

  .tree-view__label {
    padding: 8px;
  }
</style>
