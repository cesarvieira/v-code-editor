<script setup lang="ts">
import { VField, VInput } from 'vuetify/components';
import type {
  PropType,
  Slots,
} from 'vue';
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useModel,
  watch,
} from 'vue';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { Compartment, EditorState } from '@codemirror/state';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import type { LanguageSupport } from '@codemirror/language';
import { makeVTextareaProps } from 'vuetify/lib/components/VTextarea/VTextarea.mjs';
import { useDefaults } from 'vuetify';
import { filterInputAttrs } from 'vuetify/lib/util/helpers.mjs';
import { makeVInputProps } from 'vuetify/lib/components/VInput/VInput.mjs';
import { makeVFieldProps } from 'vuetify/lib/components/VField/VField.mjs';
import { makeDensityProps } from 'vuetify/lib/composables/density.mjs';

const _props = defineProps({
  ...makeVTextareaProps(),
  ...makeVInputProps(),
  ...makeVFieldProps({
    centerAffix: false,
  }),
  ...makeDensityProps(),

  mode: {
    type: String as PropType<'css' | 'html' | 'javascript' | LanguageSupport>,
    default: 'html',
  },
  minHeight: {
    type: Number,
    default: undefined,
  },
});

const props = useDefaults(_props, 'VCodeEditor');
const attrs = useAttrs();

const model = useModel(props, 'modelValue');

const isFocused = ref(false);
const editorContainer = ref<HTMLElement>();
const editor = ref<EditorView | null>(null);

const fieldProps = computed(() => VField.filterProps(props));
const inputProps = computed(() => VInput.filterProps(props));
const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
const minHeightLocal = computed(() => {
  if (props.minHeight) {
    return `${props.minHeight}px`;
  }

  switch (props.density) {
    case 'compact':
      return undefined;
    case 'comfortable':
      return '100px';
    default:
      return '150px';
  }
});

const computedModelValue = computed({
  get(): string {
    if (
      editor.value &&
      props.modelValue !== editor.value.state.doc.toString()
    ) {
      editor.value.dispatch({
        changes: {
          from: 0,
          to: editor.value.state.doc.length,
          insert: props.modelValue || '',
        },
      });
    }
    return props.modelValue || '';
  },
  set(newVal: string) {
    model.value = newVal;
  },
});
const hasValue = ref((props.modelValue?.length || 0) > 0);

const readOnlyCompartment = new Compartment();
const editableCompartment = new Compartment();

onMounted(() => {
  let extensionMode: LanguageSupport;
  if (typeof props.mode === 'string') {
    switch (props.mode) {
      case 'css':
        extensionMode = css();
        break;
      case 'javascript':
        extensionMode = javascript();
        break;
      case 'html':
        extensionMode = html();
        break;
      default:
        throw new Error(`Invalid mode: ${props.mode}`);
    }
  } else {
    extensionMode = props.mode ?? html();
  }

  editor.value = new EditorView({
    state: EditorState.create({
      doc: props.modelValue || '',
      extensions: [
        basicSetup,
        extensionMode,
        EditorView.updateListener.of((update) => {
          if (update.focusChanged) {
            isFocused.value = update.view.hasFocus;
          }
          if (update.docChanged) {
            computedModelValue.value = update.state.doc.toString();
            hasValue.value = update.state.doc.toString().length > 0;
          }
        }),
        keymap.of([indentWithTab]),
        readOnlyCompartment.of(EditorState.readOnly.of(props.readonly ?? false)),
        editableCompartment.of(EditorView.editable.of(props.disabled ? false : true)),
      ],
    }),
    parent: editorContainer.value,
  });
});

watch(() => props.readonly, (readonly) => {
  if (!editor.value) return;
  editor.value.dispatch({
    effects: readOnlyCompartment.reconfigure(EditorState.readOnly.of(readonly ?? false)),
  });
});

watch(() => props.disabled, (disabled) => {
  if (!editor.value) return;
  editor.value.dispatch({
    effects: editableCompartment.reconfigure(EditorView.editable.of(disabled ? false : true)),
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<template>
  <VInput
    v-bind="{
      ...inputProps,
      ...rootAttrs,
      ...inputAttrs,
      focused: isFocused || (inputProps.focused as boolean),
    }"
    v-model="computedModelValue"
    class="v-code-editor__input"
  >
    <template #default="{ id, isDirty, isValid, isReadonly }">
      <VField
        :id="id.value"
        v-bind="{
          ...fieldProps,
          error: isValid.value === false,
          dirty: isDirty.value || isFocused || hasValue,
          focused: isFocused || inputProps.focused,
          density: props.density,
        }"
        :style="{ minHeight: minHeightLocal }"
        @click:clear="!isReadonly.value ? (model = '') : undefined"
      >
        <template #default>
          <div
            :id="id.value"
            ref="editorContainer"
            class="h-100 w-100"
            :class="{
              dirty: !(isFocused || isDirty.value || inputProps.focused),
            }"
          ></div>
        </template>
        <template v-for="(_, slotName) in $slots as Slots" #[slotName]="slotProps">
          <slot v-if="slotName !== 'default'" :name="slotName" v-bind="slotProps"></slot>
        </template>
      </VField>
    </template>
  </VInput>
</template>
