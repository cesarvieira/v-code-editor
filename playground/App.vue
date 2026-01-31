<script setup lang="ts">
import { ref } from 'vue';
import { VCodeEditor } from '../src/index';

const model = ref('');
const modelClearable = ref('<div class="example">Click the clear icon to reset</div>');
const modelDensity = ref('// density: "compact" | "default" | "comfortable"');
const modelDisabled = ref('<p>This content cannot be edited</p>');
const modelReadonly = ref('// readonly: true — view only, no edits');
const modelFlat = ref('// flat: true — no elevation/shadow');
const modelVariant = ref('// variant: "outlined" | "filled" | "plain" | "underlined"');
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <h1 class="text-h3 mb-4">VCodeEditor - Playground</h1>
        <p class="text-body-1 mb-6">
          Explore different configurations and use cases of the VCodeEditor component.
        </p>
      </VCol>
    </VRow>

    <!-- 1. Basic -->
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>1. Basic</VCardTitle>
          <VCardText>
            <p class="text-caption mb-4">Simple usage with v-model.</p>
            <VRow>
              <VCol cols="12" md="6">
                <VCodeEditor
                  v-model="model"
                  label="CSS Personalizado"
                  mode="css"
                  density="default"
                  variant="outlined"
                  color="primary"
                  hide-details="auto"
                  rows="10"
                  rounded="xl"
                />
              </VCol>
              <VCol cols="12" md="6">
                <VTextarea
                  v-model="model"
                  label="CSS Personalizado"
                  density="default"
                  variant="outlined"
                  color="primary"
                  hide-details="auto"
                  rows="10"
                  rounded="xl"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 2. Clearable -->
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>2. Clearable</VCardTitle>
          <VCardText>
            <p class="text-caption mb-4">
              <code>clearable</code> — shows a clear icon when there is content; clicking it resets the value.
            </p>
            <VCodeEditor v-model="modelClearable" clearable />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 3. Density -->
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>3. Density</VCardTitle>
          <VCardText>
            <p class="text-caption mb-4">
              <code>density</code> — controls vertical padding:
              <code>compact</code>, <code>default</code>, <code>comfortable</code>.
            </p>
            <VRow>
              <VCol cols="12" md="4">
                <p class="text-caption mb-2">compact</p>
                <VCodeEditor v-model="modelDensity" density="compact" />
              </VCol>
              <VCol cols="12" md="4">
                <p class="text-caption mb-2">default</p>
                <VCodeEditor v-model="modelDensity" density="default" />
              </VCol>
              <VCol cols="12" md="4">
                <p class="text-caption mb-2">comfortable</p>
                <VCodeEditor v-model="modelDensity" density="comfortable" />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 4. Disabled -->
    <VRow>
      <VCol cols="12" md="6">
        <VCard>
          <VCardTitle>4. Disabled</VCardTitle>
          <VCardText>
            <p class="text-caption mb-4">
              <code>disabled</code> — editor is not interactive and appears muted.
            </p>
            <VCodeEditor v-model="modelDisabled" disabled />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="6">
        <VCard>
          <VCardTitle>5. Readonly</VCardTitle>
          <VCardText>
            <p class="text-caption mb-4">
              <code>readonly</code> — content is visible but cannot be edited.
            </p>
            <VCodeEditor v-model="modelReadonly" readonly />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 6. Flat -->
    <VRow>
      <VCol cols="12" md="6">
        <VCard>
          <VCardTitle>6. Flat</VCardTitle>
          <VCardText>
            <p class="text-caption mb-4">
              <code>flat</code> — removes elevation/shadow from the field.
            </p>
            <VCodeEditor v-model="modelFlat" flat />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 7. Variant -->
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>7. Variant</VCardTitle>
          <VCardText>
            <p class="text-caption mb-4">
              <code>variant</code> — style of the field:
              <code>outlined</code>, <code>filled</code>, <code>plain</code>,
              <code>underlined</code>, <code>solo</code>, <code>solo-filled</code>,
              <code>solo-inverted</code>.
            </p>
            <VRow>
              <VCol cols="12" md="6">
                <p class="text-caption mb-2">outlined</p>
                <VCodeEditor v-model="modelVariant" variant="outlined" />
              </VCol>
              <VCol cols="12" md="6">
                <p class="text-caption mb-2">filled</p>
                <VCodeEditor v-model="modelVariant" variant="filled" />
              </VCol>
              <VCol cols="12" md="6">
                <p class="text-caption mb-2">plain</p>
                <VCodeEditor v-model="modelVariant" variant="plain" />
              </VCol>
              <VCol cols="12" md="6">
                <p class="text-caption mb-2">underlined</p>
                <VCodeEditor v-model="modelVariant" variant="underlined" />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 8. Combined -->
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>8. Combined (flat + clearable + comfortable)</VCardTitle>
          <VCardText>
            <p class="text-caption mb-4">
              Multiple props can be used together.
            </p>
            <VCodeEditor
              v-model="modelClearable"
              flat
              clearable
              density="comfortable"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
