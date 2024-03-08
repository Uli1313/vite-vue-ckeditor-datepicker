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
      <button type="submit" class="btn btn-primary">提交表單</button>
    </VForm>
    {{ date }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        // DatePicker
        date: null,
      };
    },
    methods: {
      onSubmit() {
        console.log('表單提交成功', this.email, this.date);
      },
      blurEvent() {
        console.log('blur')
      }
    }
  }
</script>

<style>
</style>