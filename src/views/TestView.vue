<template>
  <div class="p-4 border border-2">
    <h2 class="mb-3">表單</h2>
    <VForm ref="form" @submit="onSubmit" v-slot="{ errors }">
      <div class="mb-3">

        <!-- Email -->
        <label for="datepicker">Email：</label>
        <VField
          name="email"
          type="email"
          rules="required|email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          v-model="email"
        />
        <ErrorMessage name="email" class="invalid-feedback"/>
      </div>

      <!-- VueDatePicker -->
      <div class="mb-3">
        <label for="datepicker">選擇日期：</label>
        <VField
          name="日期"
          v-model="date"
          rules="required"
        >
          <VueDatePicker
            v-model="date"
            input-class-name="border-0"
            class="form-control"
            style="padding: 1px; padding-right: 36px;"
            :class="{ 'is-invalid': errors['日期'] }"
          ></VueDatePicker>
        </VField>
        <ErrorMessage name="日期" class="invalid-feedback"/>
      </div>

        <!-- ckeditor -->
      <div class="mb-3">
        <label for="">內容：</label>
        <VField
          data-test="VField"
          name="內容"
          v-model="editorData"
          rules="required"
          @blur="blurEvent"
        >
          <ckeditor
            data-test="ckeditor"
            :editor="editor"
            :config="editorConfig"
            v-model="editorData"
            :class="{ 'is-invalid': errors['內容'] }"
          ></ckeditor>
        </VField>
        <ErrorMessage name="內容" class="invalid-feedback"/>
      </div>

      <button type="submit" class="btn btn-primary">提交表單</button>
    </VForm>
    {{ date }}
    {{ editorData }}
    
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '@/methods/uploadImage.js';

  export default {
    data() {
      return {
        email: '',
        // DatePicker
        date: null,
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
      onSubmit() {
        console.log('表單提交成功', this.email, this.date, this.editorData);
      },
      blurEvent() {
        console.log('blur')
      },
    }
  }
//   function MyCustomUploadAdapterPlugin(editor) {
//   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//       return new MyUploadAdapter(loader);
//   };
// }
</script>

<style>
</style>