<template>
  <!-- example group -->
  <foldable :fold="folded">
    <div
      class="example-group-box flex-col items-stretch"
      v-if="props.exampleGroups && props.exampleGroups.length"
    >
      <div
        class="example-group-item flex-col items-stretch"
        v-for="(exampleGroupItem, index) in props.exampleGroups"
        :key="index"
      >
        <div
          class="example-item-box flex-col items-stretch"
          v-if="exampleGroupItem.examples && exampleGroupItem.examples.length"
        >
          <div
            class="example-item text-grey-500"
            v-for="(example, exampleIndex) in exampleGroupItem.examples"
            :key="exampleIndex"
          >
            <!-- labels -->
            <!-- display labels for every example line -->
            <labels
              class="mr-1"
              color="registers"
              :labels="exampleGroupItem.registers"
              v-if="exampleGroupItem.registers && exampleGroupItem.registers.length"
            />
            <span v-html="`&quot;${example}&quot;`" />
          </div>
        </div>
      </div>
    </div>
  </foldable>
</template>

<script lang="ts" src="./exampleGroups.ts"></script>
