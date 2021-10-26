export default {
  props: {
    tree: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Array,
      default: () => [],
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    childrenKey: {
      type: String,
      default: 'children',
    },
    typeKey: {
      type: String,
      default: 'type',
    },
    branchType: {
      type: String,
      default: 'branch',
    },
    indentStart: {
      type: Number,
      default: 0,
    },
    indentMax: {
      type: Number,
      default: Infinity,
    },
  },
};
