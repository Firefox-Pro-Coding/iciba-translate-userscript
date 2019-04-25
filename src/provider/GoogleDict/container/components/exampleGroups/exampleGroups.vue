<template>
  <!-- example group -->
  <div class="example-group-box q-flex-co align-stretch" v-if="exampleGroups && exampleGroups.length">
    <div
      class="example-group-item q-flex-co align-stretch"
      v-for="(exampleGroupItem, index) in exampleGroups"
      :key="index">
      <div
        class="example-item-box q-flex-co align-stretch"
        v-if="exampleGroupItem.examples && exampleGroupItem.examples.length">
        <!-- labels -->
        <div
          class="example-registers-box"
          v-if="exampleGroupItem.registers && exampleGroupItem.registers.length">
          <labels
            color="registers"
            :labels="exampleGroupItem.registers">
          </labels>
        </div>
        <div
          class="example-item"
          v-html="example"
          v-for="(example, exampleIndex) in exampleGroupItem.examples"
          :key="exampleIndex">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./exampleGroups.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';

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
