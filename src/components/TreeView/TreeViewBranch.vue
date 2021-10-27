<template>
  <ul class="tree-view-branch">
    <li v-for="(child, index) in children" :key="index">
      <TreeView
        ref="branch"
        :tree="child"
        :indent-start="indentStart + 1"
        v-bind="$props"
        @update:selected="_emitSelected($event)"
        @reach-start="_focusBranchLastItem(index - 1)"
        @reach-end="focusBranch(index + 1)"
      >
        <template #node="nodeData">
          <slot name="node" v-bind="nodeData"></slot>
        </template>
      </TreeView>
    </li>
  </ul>
</template>

<script>
  import propsMixin from './TreeViewPropsMixin';
  import emitsMixin from './TreeViewEmitsMixin';

  const TreeView = () => import('./TreeView');

  export default {
    name: 'TreeViewBranch',
    components: {
      TreeView,
    },
    mixins: [propsMixin, emitsMixin],
    computed: {
      children() {
        return this.tree[this.childrenKey];
      },
    },
    methods: {
      _getBranchByIndex(index) {
        return this.$refs.branch?.[index];
      },
      _focusBranchLastItem(index) {
        const branchRef = this._getBranchByIndex(index);

        if (index < 0) this._emitReachStart();
        else if (!branchRef) this._emitReachEnd();
        else branchRef.focusLast();
      },
  
      focus() {
        this.focusBranch(0);
      },
      focusLast() {
        const branchLength = this.$refs.branch?.length || 0;

        if (branchLength > 0) this.$refs.branch[branchLength - 1].focusLast();
        else this.focus();
      },
      focusBranch(index) {
        const branchRef = this._getBranchByIndex(index);

        if (index < 0) this._emitReachStart();
        else if (!branchRef) this._emitReachEnd();
        else branchRef.focus();
      },
    },
  };
</script>

<style>
  .tree-view-branch {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
