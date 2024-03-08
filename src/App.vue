<template>
  <div class="container" style="height: 100vh;">
    <div class="row align-items-center justify-content-center h-100">
      <div class="col-4">
        <form @submit.prevent="login" class="text-start">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="user.username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">password</label>
            <input type="password" class="form-control" id="password" placeholder="password" v-model="user.password">
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary">登入</button>
          </div>
        </form>
        <!-- <div class="accordion" id="accordionPanelsStayOpenExample">
          <div class="accordion-item" v-for="(item) in products" :key="item.id">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#${item.id}`" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                {{ item.title }}
              </button>
            </h2>
            <div :id="`${item.id}`" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <p>產品名稱: {{ item.title }}</p>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-8 mx-auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      products: []
    }
  },
  methods: {
    login () {
      this.isLoading = true
      const url = `https://vue3-course-api.hexschool.io/v2/admin/signin`
      const data = this.user

      this.$http.post(url, data)
        .then(res => {
          // 取得到期時間和 token 存到 cookie
          const { expired, token } = res.data
          document.cookie = `AdminToken=${token}; expires=${new Date(expired)}`

          alert(res.data.message)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    // 登入驗證
    checkLogin() {

      // 取出 token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)AdminToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )

      // token 存在則執行驗證
      if (token) {
        this.$http.defaults.headers.common.Authorization = token
        const url = `https://vue3-course-api.hexschool.io/v2/api/user/check`
        this.$http
          .post(url)
          .then(() => {
            console.log('驗證成功')
          })
          .catch((err) => {
            alert(err.response.data.message)
          })
      } else {
        alert('請先登入')
      }
    },
    getProducts() {
      const url = 'https://vue3-course-api.hexschool.io/v2/api/uli01/products'
      this.$http.get(url)
        .then(res => {
          this.products = res.data.products.slice(0,4)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.checkLogin()
    this.getProducts()
  }
}
</script>

<style scoped>
</style>
