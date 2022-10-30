<template>
  <div>
    <h2>BABA有存款: {{  money  }}</h2>
    <button @click="JieQianFromXM(100)">找小明借钱100</button><br />
    <button @click="JieQianFromXH(150)">找小红借钱150</button><br />
    <button @click="JieQianAll(200)">找所有孩子借钱200</button><br />
    <button @click="SendInfo">我是baba</button>
    <br />
    <!-- 小明 -->
    <!-- ref:获取节点(组件标签) -->
    <!-- 在Vue组件中可以通过ref获取子组件，就可以进行操作子组件数据与方法 -->
    <Son ref="xm" />
    <br />
    <!-- 小红 -->
    <Daughter ref="xh" />
  </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";

export default {
  name: "ChildrenParentTest",
  data() {
    return {
      money: 1000,
    };
  },

  methods: {
    //找儿子借钱
    JieQianFromXM(money) {
      //父组件的数据累加100
      this.money += money;
      // ref可以获取真实DOM节点，当然也可以获取子组件标签（操作子组件的数据与方法）
      this.$refs.xm.money -= money;
    },
    JieQianFromXH(money) {
      //父组件的数据累加150
      this.money += money;
      this.$refs.xh.money -= money;
    },
    JieQianAll(money) {
      this.money += 2 * money;
      // 组件实例自身拥有一个属性$children,可以获取到当前组件中全部的子组件
      this.$children.forEach(item => item.money -= money);
      //不建议用枚举获取子组件：因为没办法确定到底是那个子组件
      // 切记别这样书写：如果子组件过多，第零项可能不是小明
      // this.$children[0].money -=money;
      // this.$children[1].money -=money;

    },
    SendInfo() {
      //在父组件中获取到子组件（数据+方法）
      this.$refs.xm.tinghua();
    }
  },

  components: {
    Son,
    Daughter,
  },
};
</script>

<style>
</style>
