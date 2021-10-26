<template>
  <div id="app" class="container">
    <p v-if="isLoading">Загрузка...</p>

    <template v-else>
      <p>
        Выбрано: <b>{{ slectedPath }}</b>
      </p>

      <TreeView
        :tree="treeData"
        :selected.sync="selected"
        label-key="name"
        children-key="contents"
        branch-type="directory"
      >
        <template #node="{item, isBranch, isExpanded}">
          <div v-if="item.name">
            <FolderItem
              v-if="isBranch"
              :label="item.name"
              :is-expanded="isExpanded"
            />
            <FileItem v-else-if="item.type === 'file'" :label="item.name" />
            <LinkItem v-else :label="item.name" />
          </div>
        </template>
      </TreeView>
    </template>
  </div>
</template>

<script>
  import FolderItem from './components/FolderItem';
  import FileItem from './components/FileItem';
  import LinkItem from './components/LinkItem';
  import TreeView from './components/TreeView/TreeView';

  export default {
    name: 'App',
    components: {
      FolderItem,
      FileItem,
      LinkItem,
      TreeView,
    },
    async created() {
      await this.fetchTreeData();
    },
    data() {
      return {
        treeData: null,
        selected: [],
        isLoading: false,
      };
    },
    computed: {
      slectedPath() {
        return this.selected.map((item) => item.name).join(' / ');
      },
    },
    methods: {
      async fetchTreeData() {
        this.isLoading = true;

        const deepFreezeResult = function(obj) {
          if (Object.prototype.hasOwnProperty.call(obj, 'contents')) {
            obj.contents.forEach(deepFreezeResult);
          }

          return Object.freeze(obj);
        };

        try {
          const response = await fetch('/static/node_modules.json');
          const result = await response.json();
          this.treeData = deepFreezeResult(result);
        } catch (e) {
          console.warn(e);
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin-top: 60px;
  }

  .container {
    margin-left: auto;
    margin-right: auto;
    max-width: 720px;
  }
</style>
