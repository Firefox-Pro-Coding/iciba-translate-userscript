<template>
  <div class="flex-col items-start">
    <div class="icon-box-wrapper relative" ref="container">
      <transition-group
        class="icon-box-container flex mb-3 ease-linear"
        name="icon"
      >
        <div
          class="icon-item relative select-none"
          :class="{ mask: iconItem.mask }"
          :style="{ zIndex: iconItem.z }"
          v-for="iconItem of state.list"
          @dragstart.prevent
          @mousedown="handleDragStart(iconItem)"
          @click.right.prevent="handleToggleVisibility(iconItem.id)"
          :key="iconItem.id"
          ref="icons"
        >
          <transition name="mask">
            <div
              class="mask-box absolute ease-in-out duration-200"
              key="mask-box"
              v-show="iconItem.mask"
            />
          </transition>
          <div
            key="icon-box"
            class="icon-box absolute rounded-3px p-1"
            v-if="!iconItem.mask || true"
          >
            <i-icon
              class="icon"
              :class="{ inactive: !isProviderVisible(iconItem.id) }"
              size="36"
              :svg="iconItem.icon"
            />
          </div>
        </div>
      </transition-group>
    </div>

    <i-checkbox
      class="mt-0"
      v-model="state.form.pressCtrlToDrag"
      label="按住 ctrl 拖拽查词框"
    />
    <p class="text-14 text-grey-500 mt-1 mb-0">
      按住 ctrl 键拖拽移动查词结果框位置
    </p>

    <i-checkbox
      class="mt-4"
      v-model="state.form.pressCtrlToShowCircle"
      label="仅按住 ctrl 时查词"
    />
    <p class="text-14 text-grey-500 mt-1 mb-0">
      选择文字时，只有
      <span class="font-bold">同时按住ctrl键</span>
      时才显示小圆圈
    </p>

    <i-checkbox
      class="mt-4"
      v-model="state.form.mouseOverTranslate"
      label="鼠标 hover 查词"
    />
    <p class="text-14 text-grey-500 mt-1 mb-0">
      鼠标移到小圆圈上（而非需要点击）打开查词窗口
    </p>

    <i-checkbox
      class="mt-4"
      v-model="state.form.showPin"
      label="显示查词框固定图钉"
    />
    <p class="text-14 text-grey-500 mt-1 mb-0">
      显示固定图钉，可固定查词框使其不自动关闭
    </p>

    <i-checkbox
      class="mt-4"
      v-model="state.form.icibaCircleRightClick"
      label="右击小圆圈使用备选接口"
    />
    <p class="text-14 text-grey-500 mt-1 mb-0">
      右击小圆圈，使用备选接口查词
    </p>

    <i-checkbox
      class="mt-4"
      v-model="state.form.icibaMainInputAutoFocus"
      label="查词自动聚焦输入框"
    />
    <p class="text-14 text-grey-500 mt-1 mb-0">
      点击小圆圈查词后，自动聚焦到输入框
    </p>

    <div class="flex mt-4 pt-1">
      <div class="flex-col flex-grow-0 pr-5">
        <div class="text-grey-600 pr-4 mb-2">接口</div>
        <div
          class="option-item text-16 text-grey-600 mb-2"
          v-for="n of providerOptions"
          :key="n.key"
        >
          {{ n.label }}
        </div>
      </div>
      <div class="flex-col items-center flex-grow-0">
        <div class="text-grey-600 pr-4 mb-1">默认接口</div>
        <i-radio-group
          class="mt-0 flex-grow-0"
          v-model="state.form.defaultProvider"
        >
          <i-radio
            v-for="n of providerOptions"
            :key="n.key"
            label=""
            :value="n.key"
          />
        </i-radio-group>
      </div>
      <div class="flex-col items-center flex-grow-0">
        <div class="text-grey-600 pr-4 mb-1">备选接口</div>
        <i-radio-group
          class="mt-0"
          v-model="state.form.icibaCircleRightClickProvider"
        >
          <i-radio
            v-for="n of providerOptions"
            :key="n.key"
            label=""
            :value="n.key"
          />
        </i-radio-group>
      </div>
    </div>

    <p
      v-if="state.form.defaultProvider === state.form.icibaCircleRightClickProvider"
      class="text-14 text-brightred mt-2 mb-0"
    >
      默认接口和备选接口请选择不同的选项
    </p>
    <p class="text-14 text-grey-500 mt-1 mb-0">
      默认接口：左键点击小圆圈查词接口
      <br>
      备选接口：启用时，右键键点击小圆圈使用此查词接口
    </p>

    <i-checkbox
      class="mt-4"
      v-model="state.form.selectionMaxLengthCut"
      label="限制最大查词长度"
    />
    <p class="text-14 text-grey-500 mt-1 mb-0">
      当选择文字超过指定长度时不显示小圆圈
    </p>

    <i-slider
      v-if="state.form.selectionMaxLengthCut"
      class="mr-1 mt-0 self-stretch"
      :step="10"
      :min="50"
      :max="500"
      v-model="state.form.selectionMaxLength"
    />
    <p class="text-14 text-grey-500 mt-1 mb-0" v-if="state.form.selectionMaxLengthCut">
      最大查词长度: {{ state.form.selectionMaxLength }} （默认值: 150）
    </p>

    <div class="flex self-stretch items-center mr-1 mt-4">
      <div class="mr-3 text-grey-600">{{ state.form.icibaCircleSize }}px</div>
      <i-slider
        class="flex-grow"
        :min="10"
        :max="30"
        :step="1"
        v-model="state.form.icibaCircleSize"
        thumb-label
      />
    </div>
    <p class="text-14 text-grey-500 mt-1 mb-0">
      小圆圈大小（默认22px）
    </p>

    <div class="flex items-center mr-1 mt-4 self-stretch">
      <div class="mr-3 text-grey-600">x: {{ state.form.icibaCircleOffsetX }}</div>
      <i-slider
        class="flex-grow"
        :min="0"
        :max="30"
        v-model="state.form.icibaCircleOffsetX"
        thumb-label
      />
    </div>
    <div class="flex items-center mr-1 self-stretch">
      <div class="mr-3 text-grey-600">y: {{ state.form.icibaCircleOffsetY }}</div>
      <i-slider
        class="flex-grow"
        :min="0"
        :max="30"
        v-model="state.form.icibaCircleOffsetY"
        thumb-label
      />
    </div>
    <p class="text-14 text-grey-500 mt-1 mb-0">
      小圆圈偏移量（单位：px）
      <br>
      选择文字时，小圆圈偏移鼠标指针右下方的位置。默认 x=7 y=7
    </p>

    <div class="flex items-center mr-1 mt-4 self-stretch">
      <div class="mr-3 text-grey-600">{{ state.form.icibaMainWidth }}px</div>
      <i-slider
        class="flex-grow"
        :min="200"
        :max="500"
        :step="10"
        v-model="state.form.icibaMainWidth"
        thumb-label
      />
    </div>
    <p class="text-14 text-grey-500 mt-1 mb-0">
      查词框宽度（单位：px）（默认300px）
    </p>
  </div>
</template>

<script lang="ts" src="./coreSetting.ts"></script>
<style lang="sass" src="./coreSetting.sass"></style>
