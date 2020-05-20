<template>
  <div class="flex-col items-start">
    <provider-sort />

    <i-checkbox-line
      v-model="form.useIcibaCircle"
      label="显示小圆圈"
    >
      选中文字后显示小圆圈
      （关闭后<span class="font-bold">仅能使用热键</span>查词）
    </i-checkbox-line>

    <foldable :fold="!form.useIcibaCircle">
      <i-checkbox-line
        v-model="form.pressCtrlToShowCircle"
        label="仅按住 ctrl 时显示小圆圈"
      >
        选择文字时，只有
        <span class="font-bold">同时按住ctrl键</span>
        时才显示小圆圈
      </i-checkbox-line>

      <i-checkbox-line
        v-model="form.mouseOverTranslate"
        label="hover 小圆圈自动点击"
        text="鼠标移到小圆圈上自动点击并打开查词窗口"
      />

      <i-checkbox-line
        v-model="form.icibaMainInputAutoFocus"
        label="自动聚焦输入框"
        text="点击小圆圈查词后，自动聚焦到输入框"
      />

      <i-checkbox-line
        v-model="form.icibaCircleRightClick"
        label="右击小圆圈使用备选接口"
        text="右击小圆圈，使用备选接口查词"
      />

      <foldable :fold="!form.icibaCircleRightClick">
        <div class="flex mt-6">
          <div class="flex-col flex-grow-0 pr-12">
            <div class="text-grey-600 pr-6 mb-2">接口</div>
            <div
              class="option-item text-16 text-grey-600 mb-2"
              v-for="n of providerOptions"
              :key="n.key"
            >
              {{ n.label }}
            </div>
          </div>
          <div class="flex-col items-center flex-grow-0">
            <div class="text-grey-600 pr-6 mb-1">默认接口</div>
            <i-radio-group
              class="mt-0 flex-grow-0"
              v-model="form.defaultProvider"
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
            <div class="text-grey-600 pr-6 mb-1">备选接口</div>
            <i-radio-group
              class="mt-0"
              v-model="form.icibaCircleRightClickProvider"
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
          v-if="form.defaultProvider === form.icibaCircleRightClickProvider"
          class="text-14 text-red-500 mt-2 mb-0"
        >
          默认接口和备选接口请选择不同的选项
        </p>
        <p class="text-14 text-grey-400 mt-1 mb-0">
          默认接口：左键点击小圆圈查词接口
          <br>
          备选接口：启用时，右键键点击小圆圈使用此查词接口
        </p>
      </foldable>
    </foldable>

    <i-checkbox-line
      v-model="form.pressCtrlToDrag"
      label="按住 Ctrl 拖拽查词框"
      text="按住 Ctrl 键可拖拽移动查词框位置"
    />

    <i-checkbox-line
      v-model="form.showPin"
      label="启用固定图钉"
      text="显示固定图钉，可固定查词框使其不自动关闭"
    />

    <foldable :fold="!form.useIcibaCircle">
      <i-checkbox-line
        v-model="form.selectionMaxLengthCut"
        label="限制最大查词长度"
        text="当选择文字超过长度时不显示小圆圈"
      />

      <foldable :fold="!form.selectionMaxLengthCut">
        <i-slider
          class="mr-1 mt-2px self-stretch"
          :step="10"
          :min="50"
          :max="500"
          v-model="form.selectionMaxLength"
        />
        <p class="text-14 text-grey-400">
          最大查词长度: {{ form.selectionMaxLength }} （默认值: 150）
        </p>
      </foldable>

      <div class="flex self-stretch items-center mr-1 mt-6">
        <div class="mr-4 text-grey-600">{{ form.icibaCircleSize }}px</div>
        <i-slider
          class="flex-grow"
          :min="10"
          :max="30"
          :step="1"
          v-model="form.icibaCircleSize"
          thumb-label
        />
      </div>
      <p class="text-14 text-grey-400 mt-1 mb-0">
        小圆圈大小（默认22px）
      </p>

      <div class="flex mt-6">
        <div class="flex-col justify-around flex-none">
          <div class="mr-4 text-grey-600">x: {{ form.icibaCircleOffsetX }}</div>
          <div class="mr-4 text-grey-600">y: {{ form.icibaCircleOffsetY }}</div>
        </div>
        <div class="flex-col justify-around flex-auto">
          <i-slider
            class="flex-grow"
            :min="0"
            :max="30"
            v-model="form.icibaCircleOffsetX"
            thumb-label
          />

          <i-slider
            class="flex-grow"
            :min="0"
            :max="30"
            v-model="form.icibaCircleOffsetY"
            thumb-label
          />
        </div>
      </div>
      <p class="text-14 text-grey-400 mt-1 mb-0">
        小圆圈位置偏移（单位：px）
        <br>
        选择文字时，小圆圈偏移鼠标指针右下方的位置。默认 x=7 y=7
      </p>
    </foldable>

    <div class="flex items-center mr-1 mt-6 self-stretch">
      <div class="mr-4 text-grey-600">{{ form.icibaMainWidth }}px</div>
      <i-slider
        class="flex-grow"
        :min="200"
        :max="500"
        :step="10"
        v-model="form.icibaMainWidth"
        thumb-label
      />
    </div>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      查词框宽度（单位：px）（默认300px）
    </p>
  </div>
</template>

<script lang="ts" src="./coreSetting.ts"></script>
