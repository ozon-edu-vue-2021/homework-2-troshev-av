<template>
  <div class="tree-view">
    <TreeViewNode
      ref="node"
      :label="label"
      :is-selected="isSelected"
      :indent="indent"
      @select="_selectNodeHandler()"
      @focus-prev="focusPrev()"
      @focus-next="focusNext()"
    >
      <slot name="node" v-bind="{ item: tree, isBranch, isExpanded }"></slot>
    </TreeViewNode>

    <TreeViewBranch
      ref="branch"
      v-if="isBranch && isExpanded"
      v-bind="$props"
      @update:selected="_emitSelected([tree, ...$event])"
      @reach-start="focus()"
      @reach-end="_emitReachEnd()"
    >
      <template #node="nodeData">
        <slot name="node" v-bind="nodeData"></slot>
      </template>
    </TreeViewBranch>
  </div>
</template>

<script>
  import TreeViewNode from './TreeViewNode';
  import TreeViewBranch from './TreeViewBranch';

  import propsMixin from './TreeViewPropsMixin';
  import emitsMixin from './TreeViewEmitsMixin';

  export default {
    name: 'TreeView',
    components: {
      TreeViewNode,
      TreeViewBranch,
    },
    mixins: [propsMixin, emitsMixin],
    data() {
      return {
        isExpanded: false,
      };
    },
    computed: {
      isBranch() {
        return this.tree[this.typeKey] === this.branchType;
      },
      isSelected() {
        if (this.isBranch) return false;
        return this.selected.includes(this.tree);
      },
      label() {
        return this.tree[this.labelKey];
      },
      indent() {
        return Math.min(this.indentStart, this.indentMax);
      },
    },
    methods: {
      _selectNodeHandler() {
        if (this.isBranch) this.toggle();
        else this._emitSelected([this.tree]);
      },

      toggle(value = !this.isExpanded) {
        this.isExpanded = value;
      },
      focus() {
        this.$refs.node.focus();
      },
      focusLast() {
        if (!this.$refs.branch) this.focus();
        else this.$refs.branch.focusLast();
      },
      focusPrev() {
        this._emitReachStart();
      },
      focusNext() {
        if (!this.$refs.branch) this._emitReachEnd();
        else this.$refs.branch.focus();
      },
    },
  };
</script>

<style>
  .tree-view__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
