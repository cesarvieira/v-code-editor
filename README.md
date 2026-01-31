# v-code-editor

Vue 3 code editor component built with Vuetify 3, CodeMirror 6, and TypeScript. Syntax highlighting for HTML, CSS, and JavaScript.

## Features

- Full integration with **Vuetify 3** (VField, VInput — label, hint, density, variant)
- **CodeMirror 6** with basic setup and Tab indent
- **Syntax modes**: `html`, `css`, `javascript` (or custom `LanguageSupport`)
- **v-model** with `string` (editor content)
- **clearable**, **disabled**, **readonly**, **flat**
- **density**: `compact`, `default`, `comfortable`
- **variant**: `outlined`, `filled`, `plain`, `underlined`, `solo`, `solo-filled`, `solo-inverted`
- **minHeight** (pixels) or auto from density
- **TypeScript** support

## Requirements

- Vue 3.5+
- Vuetify 3.11+
- CodeMirror 6 and language packages (see Installation)

## Installation

```bash
npm install @cesarv/v-code-editor codemirror @codemirror/lang-html @codemirror/lang-css @codemirror/lang-javascript vue vuetify
```

## Usage

### Global registration (optional)

```typescript
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { VCodeEditor } from '@cesarv/v-code-editor';
import '@cesarv/v-code-editor/dist/styles.css';

const app = createApp(App);
app.use(createVuetify());
app.component('VCodeEditor', VCodeEditor);
```

### Direct import in component

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VCodeEditor } from '@cesarv/v-code-editor';
import '@cesarv/v-code-editor/dist/styles.css';

const code = ref('');
</script>

<template>
  <VCodeEditor v-model="code" label="HTML" />
</template>
```

## Examples

### Basic

```vue
<template>
  <VCodeEditor v-model="code" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VCodeEditor } from '@cesarv/v-code-editor';

const code = ref('');
</script>
```

### Mode (html, css, javascript)

```vue
<template>
  <VCodeEditor v-model="htmlCode" mode="html" label="HTML" />
  <VCodeEditor v-model="cssCode" mode="css" label="CSS" />
  <VCodeEditor v-model="jsCode" mode="javascript" label="JavaScript" />
</template>
```

### Clearable

Shows a clear icon when there is content; clicking it resets the value.

```vue
<template>
  <VCodeEditor v-model="code" clearable />
</template>
```

### Density (compact, default, comfortable)

Controls vertical padding / min-height.

```vue
<template>
  <VCodeEditor v-model="code" density="compact" />
  <VCodeEditor v-model="code" density="default" />
  <VCodeEditor v-model="code" density="comfortable" />
</template>
```

### Variant (outlined, filled, plain, underlined)

Field style, same as Vuetify inputs.

```vue
<template>
  <VCodeEditor v-model="code" variant="outlined" />
  <VCodeEditor v-model="code" variant="filled" />
  <VCodeEditor v-model="code" variant="plain" />
  <VCodeEditor v-model="code" variant="underlined" />
</template>
```

### Disabled and readonly

```vue
<template>
  <VCodeEditor v-model="code" label="Disabled" disabled />
  <VCodeEditor v-model="code" label="Read only" readonly />
</template>
```

### Flat

Removes elevation/shadow from the field.

```vue
<template>
  <VCodeEditor v-model="code" flat />
</template>
```

### Label and hint

```vue
<template>
  <VCodeEditor
    v-model="code"
    label="Snippet"
    hint="Edit the code above"
    persistent-hint
  />
</template>
```

## API

### Props

| Prop        | Type                                                                 | Default    | Description                                      |
| ----------- | -------------------------------------------------------------------- | ---------- | ------------------------------------------------ |
| `modelValue`| `string`                                                             | `null`     | Editor content (v-model).                        |
| `mode`      | `'html' \| 'css' \| 'javascript' \| LanguageSupport`                 | `'html'`   | Syntax mode.                                     |
| `clearable` | `boolean`                                                            | —          | Shows clear icon when there is content.          |
| `disabled`  | `boolean`                                                            | —          | Disables editing.                                |
| `readonly`  | `boolean`                                                            | —          | Content visible but not editable.                |
| `flat`      | `boolean`                                                            | —          | Removes elevation/shadow.                        |
| `density`   | `'compact' \| 'default' \| 'comfortable'`                             | —          | Vertical density.                                |
| `variant`   | `'outlined' \| 'filled' \| 'plain' \| 'underlined' \| 'solo' \| …`   | —          | Field visual variant.                            |
| `label`     | `string`                                                             | —          | Field label.                                     |
| `hint`      | `string`                                                             | —          | Help text.                                       |
| `persistentHint` | `boolean`                                                        | —          | Keeps hint always visible.                       |

Other **VInput**, **VField**, and **VTextarea** props from Vuetify are forwarded when applicable.

### Events

| Event               | Payload  | Description                          |
| ------------------- | -------- | ------------------------------------ |
| `update:modelValue` | `string` | Emitted when the editor content changes. |

### v-model

- **Value:** `string`
- Two-way binding to the editor text. Clear (when `clearable`) sets it to `''`.

## Playground

The repository includes a playground in `playground/` with usage examples. To run it:

```bash
git clone https://github.com/cesarvieira/v-code-editor.git
cd v-code-editor
npm install
npm run dev
```

## Dependencies

- [CodeMirror 6](https://codemirror.net/) — editor core
- [@codemirror/lang-html](https://www.npmjs.com/package/@codemirror/lang-html), [@codemirror/lang-css](https://www.npmjs.com/package/@codemirror/lang-css), [@codemirror/lang-javascript](https://www.npmjs.com/package/@codemirror/lang-javascript) — language support (peer dependencies)

## License

ISC

## Author

[Cesar Vieira](https://github.com/cesarvieira)
