<template>
  <div>
    <!-- 可以巧妙地利用a标签实现按钮带有提示功能 -->
    <a :title="title">
      <!-- 下面的这种写法不能用冒号，必须要使用v-bind -->
      <!-- 下面这种写法，v-on不能用@进行替换 -->
      <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
    </a>
  </div>
</template>

<script>
export default {
  name: "",
  props: ['title'],
  mounted() {
    //this.$attrs:属于组件自身的一个属性，可以获取到父亲传递过来的props数据
    // 对于子组件而言，父组件给的数据可以利用props接收，但是需要注意，如果子组件通过props接收的属性，在$attrs属性中是获取不到的
    //this.$attrs是可以获取父亲传递的props数据，如果子组件通过
    //props:[],接受，this.$attrs属性是获取不到的
    console.log(this.$attrs);
    // $listeners也是组件实例自身的一个属性，它可以获取到父组件给子组件传递的自定义事件
    console.log(this.$listeners);
  }
};
</script>

<style scoped>
</style>
