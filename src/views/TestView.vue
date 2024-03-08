<template>
  <div class="p-4 border border-2">
    <ckeditor
      :editor="editor"
      :config="editorConfig"
      v-model="editorData"
    ></ckeditor>
    {{ editorData }}
    
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '@/methods/uploadImage.js';

  export default {
    data() {
      return {
        // ckeditor
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          extraPlugins: [
            function(editor) {
              editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                console.log(new MyUploadAdapter(loader))
                return new MyUploadAdapter(loader);
            }}
          ]
        }
      };
    },
    methods: {
    }
  }
</script>

<style>
</style>