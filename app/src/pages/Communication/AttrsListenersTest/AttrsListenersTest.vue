<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- 二次封装的HintButton按钮的时候，把人家el-button需要的数据传递过去 -->
    <!-- 当用户在使用我们封装的按钮的时候，需要向HintButton组件传递相应的参数（对el-button进行二次封装） -->
    <!-- @click,底下这里代表的是自定义事件 -->
    <HintButton type="success" icon="el-icon-plus" title="我是中国人" @click="handler" />
  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from './HintButton';
export default {
  name: 'AttrsListenersTest',
  components: {
    HintButton
  },
  methods: {
    // 点击事件的回调
    handler() {
      alert('弹弹弹');
    },
  },
}
</script>
