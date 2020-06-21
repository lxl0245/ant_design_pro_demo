<template>
  <a-form :layout="formLayout" :form="form">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group
        default-value="horizontal"
        @change="handleFormLayoutChange"
      >
        <a-radio-button value="horizontal">
          Horizontal
        </a-radio-button>
        <a-radio-button value="vertical">
          Vertical
        </a-radio-button>
        <a-radio-button value="inline">
          Inline
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- 把 fieldA 托管给 form 组件 -->
      <!-- decorator 仅仅是一个标志位  -->
      <a-input
        placeholder="input placeholder"
        v-decorator="[
          'fieldA',
          {
            initialValue: fieldA,
            rules: [{ required: true, min: 6, message: '必须大于5个字符xxx' }]
          }
        ]"
      />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- 把 fieldB 托管给 form，让 form 去收集它相关的数据  -->
      <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    // createForm(this) 主要是在底层数据改变时，动态修改 form
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      fieldA: "hello",
      // fieldAStatus: "",
      // fieldAHelp: "",
      fieldB: "",
      // fieldBStatus: "",
      // fieldBHelp: ""
    };
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    //   handleSubmit() {
    //     if (this.fieldA.length <= 5) {
    //       this.filedAStatus = "error";
    //       this.filedAHelp = "必须大于5个字符";
    //     } else {
    //       console.log({
    //         fieldA: this.fieldA,
    //         fieldB: this.fieldB
    //       })
    //     }
    //   }
    // }
    handleSubmit() {
      this.form.validateFields((err, value) => {
        if (!err) {
          // 校验通过
          console.log(value);

          // 后台发送请求、处理完成等之后，就可以把这个数据同步给其它组件使用了
          // this.fieldA = value.fieldA;
          // this.fieldB = value.fieldB;

          // 更简便的写法，直接往 this 上赋值
          Object.assign(this, value); // 这句就可以把 value.filedA同步给 this.fieldA，同理， fieldB

          // 如果还想动态的通过接口返回来的数据，修改 form 表单的值呢？同样通过form提供的API来更改值 setFieldsValue
          // 见 mounted () 钩子
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.form.setFieldsValue({ fieldA: "hello world" }); // 来自后端的数据值
    });
  }
};
</script>
