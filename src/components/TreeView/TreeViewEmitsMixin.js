export default {
  methods: {
    _emitReachStart() {
      this.$emit('reach-start');
    },
    _emitReachEnd() {
      this.$emit('reach-end');
    },
    _emitSelected(value) {
      this.$emit('update:selected', value);
    },
  },
};
