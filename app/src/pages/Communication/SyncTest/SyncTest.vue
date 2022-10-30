<template>
  <div>
    小明的爸爸现在有{{  money  }}元
    <h2>不使用sync修改符</h2>
    <!-- 在原生事件中，$event是事件对象；在自定义事件中，$event是传递过来的数据（参数） -->
    <!-- 
      :money父组件给子组件传递props
      @update:money 给子组件绑定自定义事件，只不过事件的名字叫做update:money
      目前的这种操作其实和v-model很相似，可以实现父子组件数据同步
    -->
    <Child :money="money" @update:money="money = $event"></Child>


    <h2>使用sync修改符</h2>
    <!-- 
      :money.sync:第一，父组件给子组件传递props money
      第二，给当前子组件绑定了一个自定义事件，而且事件名称即为update:money
    -->
    <Child :money.sync="money"></Child>
    <h2>使用v-model修改符</h2>
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child.vue'
import Child2 from './Child2.vue'
export default {
  name: 'SyncTest',
  data() {
    return {
      money: 10000
    }
  },
  components: {
    Child,
    Child2
  }
}
</script>
