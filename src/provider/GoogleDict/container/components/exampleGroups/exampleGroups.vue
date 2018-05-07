<template>
  <!-- example group -->
  <div
    class="example-group-box flex-co"
    v-if="exampleGroups && exampleGroups.length">
    <div
      class="example-group-item flex-co"
      v-for="(exampleGroupItem, index) in exampleGroups"
      :key="index">
      <div
        class="example-item-box flex-co"
        v-if="exampleGroupItem.examples && exampleGroupItem.examples.length">
        <!-- labels -->
        <div
          class="example-registers-box"
          v-if="exampleGroupItem.registers && exampleGroupItem.registers.length">
          <labels :labels="exampleGroupItem.registers"></labels>
        </div>
        <div
          class="example-item"
          v-html="example"
          v-for="(example, index) in exampleGroupItem.examples"
          :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./exampleGroups.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';

  .example-group-box {
    .example-group-item {

      .example-item-box {
        .example-item {
          color: @main-level-4;

          &::before, &::after {
            content: '"';
          }
        }
      }
    }
  }
</style>
