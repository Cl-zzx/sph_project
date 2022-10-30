export default {
    // 对外暴露的对象，可以放置组件重复的js业务逻辑
  methods: {
    giveMoney(money) {
      this.money -= money;
      this.$parent.money += money;
    },
  },
};
