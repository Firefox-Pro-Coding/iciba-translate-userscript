<template>
  <v-layout column>
    <v-checkbox
      class="mt-0"
      color="primary"
      v-model="form.pressCtrlToDrag"
      hide-details
      label="按住ctrl拖拽">
    </v-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      按住ctrl键可拖拽移动查词结果框位置
    </p>

    <v-checkbox
      class="mt-4"
      color="primary"
      hide-details
      v-model="form.pressCtrlToShowCircle"
      label="仅按住ctrl查词">
    </v-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      选择文字时，只有
      <span class="font-weight-bold">同时按住ctrl键</span>
      时才显示小圆圈
    </p>

    <v-checkbox
      class="mt-4"
      color="primary"
      hide-details
      v-model="form.mouseOverTranslate"
      label="鼠标hover查词">
    </v-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      鼠标移到小圆圈上（而非需要点击）打开查词窗口
    </p>

    <v-checkbox
      class="mt-4"
      color="primary"
      hide-details
      v-model="form.showPin"
      label="显示查词框固定钉子">
    </v-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      显示并启用固定钉子，固定住后查词框不自动关闭
    </p>

    <v-checkbox
      class="mt-4"
      color="primary"
      hide-details
      v-model="form.icibaCircleRightClick"
      label="右击小圆圈使用备选接口查词">
    </v-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      右击小圆圈使用备选接口使用备选接口查词
    </p>

    <v-layout class="mt-4 pt-1">
      <v-layout column class="flex-nogrow pr-5">
        <div class="grey--text text--darken-1 pr-4 mb-2">接口</div>
        <div
          class="grey--text text--darken-1"
          style="height: 24px; margin-bottom: 8px"
          v-for="n of providerOptions"
          :key="n.key">
          {{ n.label }}
        </div>
      </v-layout>
      <v-layout align-center column class="flex-nogrow">
        <div class="grey--text text--darken-1 pr-4 mb-1">默认接口</div>
        <v-radio-group
          class="mt-0 flex-nogrow"
          hide-details
          v-model="form.defaultProvider">
          <v-radio
            color="primary"
            v-for="n of providerOptions"
            :key="n.value"
            label=""
            :value="n.value">
          </v-radio>
        </v-radio-group>
      </v-layout>
      <v-layout align-center column class="flex-nogrow">
        <div class="grey--text text--darken-1 pr-4 mb-1">备选接口</div>
        <v-radio-group
          class="mt-0"
          hide-details
          v-model="form.icibaCircleRightClickProvider">
          <v-radio
            color="primary"
            v-for="n of providerOptions"
            :key="n.value"
            label=""
            :value="n.value">
          </v-radio>
        </v-radio-group>
      </v-layout>
    </v-layout>

    <p
      v-if="form.defaultProvider === form.icibaCircleRightClickProvider"
      class="body-2 error--text mt-2 mb-0">
      默认接口和备选接口请选择不同的选项
    </p>
    <p class="body-2 grey--text mt-1 mb-0">
      默认接口：左键点击小圆圈查词接口
      <br>
      备选接口：启用时，右键键点击小圆圈使用此查词接口
    </p>

    <v-checkbox
      class="mt-4"
      color="primary"
      hide-details
      v-model="form.selectionMaxLengthCut"
      label="限制最大查词长度">
    </v-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      当选择文字超过最大长度时不显示小圆圈
    </p>

    <v-slider
      v-if="form.selectionMaxLengthCut"
      ref="sliderCut"
      class="mr-1 mt-0"
      :step="10"
      hide-details
      min="50"
      max="500"
      :thumb-size="24"
      v-model="form.selectionMaxLength"
      thumb-label />
    <p class="body-2 grey--text mt-1 mb-0" v-if="form.selectionMaxLengthCut">
      最大查词长度: {{ form.selectionMaxLength }} <span class="ml-1 caption">默认值: 150</span>
    </p>

    <v-slider
      ref="sliderX"
      class="mr-1 mt-4"
      :label="`x: ${form.icibaCircleOffsetX}`"
      hide-details
      min="0"
      max="30"
      :thumb-size="24"
      v-model="form.icibaCircleOffsetX"
      thumb-label />
    <v-slider
      ref="sliderY"
      class="mr-1 mt-0"
      :label="`y: ${form.icibaCircleOffsetY}`"
      hide-details
      min="0"
      max="30"
      :thumb-size="24"
      v-model="form.icibaCircleOffsetY"
      thumb-label />
    <p class="body-2 grey--text mt-1 mb-0">
      小圆圈偏移量（单位：px）
      <br>
      选择文字时小圆圈相对与鼠标的位置。默认为 x=7 y=7
    </p>

    <v-slider
      ref="sliderIcibaWidth"
      class="mr-1 mt-4"
      :label="`${form.icibaMainWidth}px`"
      hide-details
      min="200"
      max="500"
      step="10"
      :thumb-size="24"
      v-model="form.icibaMainWidth"
      thumb-label />
    <p class="body-2 grey--text mt-1 mb-0">
      查词框宽度（默认300px）
    </p>
  </v-layout>
</template>

<script lang="ts" src="./coreSetting.ts"></script>
<style lang="less" src="./coreSetting.less" scoped></style>
