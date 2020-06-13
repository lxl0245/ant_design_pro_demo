<script>
import { check } from "../utils/auth";

export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    // 如果校验通过就返回我们的子组件，没通过，就返回 Null 
    return check(props.authority) ? scopedSlots.default() : null;
  }
}
</script>
