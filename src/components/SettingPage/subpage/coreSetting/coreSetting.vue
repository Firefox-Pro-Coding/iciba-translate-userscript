<template>
  <div>
    <i-checkbox
      class="mt-0"
      v-model="form.pressCtrlToDrag"
      label="按住ctrl拖拽">
    </i-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      按住ctrl键可拖拽移动查词结果框位置
    </p>

    <i-checkbox
      class="mt-4"
      v-model="form.pressCtrlToShowCircle"
      label="仅按住ctrl查词">
    </i-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      选择文字时，只有
      <span class="font-weight-bold">同时按住ctrl键</span>
      时才显示小圆圈
    </p>

    <i-checkbox
      class="mt-4"
      v-model="form.mouseOverTranslate"
      label="鼠标hover查词">
    </i-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      鼠标移到小圆圈上（而非需要点击）打开查词窗口
    </p>

    <i-checkbox
      class="mt-4"
      v-model="form.showPin"
      label="显示查词框固定钉子">
    </i-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      显示并启用固定钉子，固定住后查词框不自动关闭
    </p>

    <i-checkbox
      class="mt-4"
      v-model="form.icibaCircleRightClick"
      label="右击小圆圈使用备选接口查词">
    </i-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      右击小圆圈使用备选接口使用备选接口查词
    </p>

    <div class="q-flex mt-4 pt-1">
      <div class="q-flex-co flex-nogrow pr-5">
        <div class="grey--text text--darken-1 pr-4 mb-2">接口</div>
        <div
          class="grey--text text--darken-1"
          style="height: 24px; margin-bottom: 8px"
          v-for="n of providerOptions"
          :key="n.key">
          {{ n.label }}
        </div>
      </div>
      <div class="q-flex-co align-center flex-nogrow">
        <div class="grey--text text--darken-1 pr-4 mb-1">默认接口</div>
        <i-radio-group
          class="mt-0 flex-nogrow"
          v-model="form.defaultProvider">
          <i-radio
            v-for="n of providerOptions"
            :key="n.value"
            label=""
            :value="n.value">
          </i-radio>
        </i-radio-group>
      </div>
      <div class="q-flex-co align-center flex-nogrow">
        <div class="grey--text text--darken-1 pr-4 mb-1">备选接口</div>
        <i-radio-group
          class="mt-0"
          v-model="form.icibaCircleRightClickProvider">
          <i-radio
            v-for="n of providerOptions"
            :key="n.value"
            label=""
            :value="n.value">
          </i-radio>
        </i-radio-group>
      </div>
    </div>

    <p
      v-if="form.defaultProvider === form.icibaCircleRightClickProvider"
      class="body-2 red--text mt-2 mb-0">
      默认接口和备选接口请选择不同的选项
    </p>
    <p class="body-2 grey--text mt-1 mb-0">
      默认接口：左键点击小圆圈查词接口
      <br>
      备选接口：启用时，右键键点击小圆圈使用此查词接口
    </p>

    <i-checkbox
      class="mt-4"
      v-model="form.selectionMaxLengthCut"
      label="限制最大查词长度">
    </i-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      当选择文字超过最大长度时不显示小圆圈
    </p>

    <i-slider
      v-if="form.selectionMaxLengthCut"
      class="mr-1 mt-0"
      :step="10"
      :min="50"
      :max="500"
      v-model="form.selectionMaxLength" />
    <p class="body-2 grey--text mt-1 mb-0" v-if="form.selectionMaxLengthCut">
      最大查词长度: {{ form.selectionMaxLength }} <span class="ml-1 caption">默认值: 150</span>
    </p>

    <div class="q-flex align-center mr-1 mt-4">
      <div class="mr-3 grey--text text--darken-1">x: {{ form.icibaCircleOffsetX }}</div>
      <i-slider
        class="flex-grow"
        :min="0"
        :max="30"
        v-model="form.icibaCircleOffsetX"
        thumb-label />
    </div>
    <div class="q-flex align-center mr-1">
      <div class="mr-3 grey--text text--darken-1">y: {{ form.icibaCircleOffsetY }}</div>
      <i-slider
        class="flex-grow"
        :min="0"
        :max="30"
        v-model="form.icibaCircleOffsetY"
        thumb-label />
    </div>
    <p class="body-2 grey--text mt-1 mb-0">
      小圆圈偏移量（单位：px）
      <br>
      选择文字时小圆圈相对与鼠标的位置。默认为 x=7 y=7
    </p>

    <div class="q-flex align-center mr-1 mt-4">
      <div class="mr-3 grey--text text--darken-1">{{ form.icibaMainWidth }}px</div>
      <i-slider
        class="flex-grow"
        :min="200"
        :max="500"
        :step="10"
        v-model="form.icibaMainWidth"
        thumb-label />
    </div>
    <p class="body-2 grey--text mt-1 mb-0">
      查词框宽度（默认300px）
    </p>
  </div>
</template>

<script lang="ts" src="./coreSetting.ts"></script>
<style lang="less" src="./coreSetting.less" scoped></style>
