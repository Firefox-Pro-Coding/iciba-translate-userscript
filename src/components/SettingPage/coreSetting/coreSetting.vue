<template>
  <v-layout column>
    <v-checkbox
      class="mt-0"
      color="primary"
      v-model="form.pressCtrlToDrag"
      hide-details
      label="按住ctrl拖拽">
    </v-checkbox>
    <p class="body-2 grey--text mt-1">
      按住ctrl键拖拽移动查词结果框位置
    </p>

    <v-checkbox
      class="mt-0"
      color="primary"
      hide-details
      v-model="form.pressCtrlToShowCircle"
      label="仅按住ctrl查词">
    </v-checkbox>
    <p class="body-2 grey--text mt-1">
      仅按住ctrl键时显示小圆圈
    </p>

    <v-checkbox
      class="mt-0"
      color="primary"
      hide-details
      v-model="form.mouseOverTranslate"
      label="鼠标hover查词">
    </v-checkbox>
    <p class="body-2 grey--text mt-1">
      鼠标移到小圆圈上（而非需要点击）打开查词窗口
    </p>

    <v-radio-group
      class="mt-0"
      hide-details
      v-model="form.defaultProvider">
      <v-radio
        color="primary"
        v-for="n of providerOptions"
        :key="n.value"
        :label="n.label"
        :value="n.value">
      </v-radio>
    </v-radio-group>
    <p class="body-2 grey--text mt-1">
      默认查词接口
    </p>

    <v-slider
      ref="sliderX"
      class="mr-1 mt-0"
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
    <p class="body-2 grey--text mt-1">
      小圆圈偏移量（单位：px）
      <br>
      选择文字时小圆圈相对与鼠标的位置。默认为 x=7 y=7
    </p>
  </v-layout>
</template>

<script lang="ts" src="./coreSetting.ts"></script>
<style lang="less" src="./coreSetting.less" scoped></style>
