<template>
  <div>
    <h2>Button</h2>
    <buessiness></buessiness>
    <small-button></small-button>
  </div>
</template>

<script>
import buessiness from './bussiness';
import smallButton from './small';

export default {
  name: 'hg-button',
  components: {
    buessiness,
    smallButton
  },
  data() {
    return {
      activeNames: ['1']
    };
  },
  methods: {
    handleChange(val) {
      console.warn(val);
    }
  }
};
</script>

<style lang="scss">
.code {
  font-size: 12px;
}

.line {
  margin: 10px 0;

  p {
    margin: 5px 0;
  }
}
</style>
