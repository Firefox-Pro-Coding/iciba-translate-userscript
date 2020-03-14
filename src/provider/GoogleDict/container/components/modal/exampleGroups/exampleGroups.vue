<template>
  <!-- example group -->
  <div class="example-group-box flex-col items-stretch" v-if="props.exampleGroups && props.exampleGroups.length">
    <div
      class="example-group-item flex-col items-stretch"
      v-for="(exampleGroupItem, index) in props.exampleGroups"
      :key="index"
    >
      <div
        class="example-item-box flex-col items-stretch"
        v-if="exampleGroupItem.examples && exampleGroupItem.examples.length"
      >
        <!-- labels -->
        <div
          class="example-registers-box"
          v-if="exampleGroupItem.registers && exampleGroupItem.registers.length"
        >
          <labels
            color="registers"
            :labels="exampleGroupItem.registers"
          />
        </div>
        <div
          class="example-item text-grey"
          v-for="(example, exampleIndex) in exampleGroupItem.examples"
          :key="exampleIndex"
          v-html="`&quot;${example}&quot;`"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./exampleGroups.ts"></script>
