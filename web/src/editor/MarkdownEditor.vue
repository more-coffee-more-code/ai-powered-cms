<template>
  <div>
    <div ref="editorEl"></div>
    <div style="margin-top:12px">
      <button @click="requestSuggestion">Get Suggestion</button>
      <pre v-if="suggestion">{{ suggestion }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

const editorEl = ref(null)
let editor = null
const suggestion = ref('')

onMounted(() => {
  editor = new Editor({
    element: editorEl.value,
    extensions: [StarterKit],
    content: '<p>Write your article here...</p>'
  })
})

onBeforeUnmount(() => {
  if (editor) editor.destroy()
})

const requestSuggestion = async () => {
  const content = editor.getHTML()
  try {
    const res = await fetch('/api/v1/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'next_sections', content })
    })
    const data = await res.json()
    suggestion.value = JSON.stringify(data, null, 2)
  } catch (err) {
    suggestion.value = 'Request failed: ' + err.message
  }
}
</script>

<style>
div[ref="editorEl"] { border: 1px solid #ddd; min-height: 150px; padding: 8px }
</style>
