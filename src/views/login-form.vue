<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <dx-form :form-data="formData" :disabled="loading">
      <dx-item
        data-field="id"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Id',
          mode: 'id',
        }"
      >
        <dx-required-rule message="Email is required" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field="password"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Password',
          mode: 'password',
        }"
      >
        <dx-required-rule message="Password is required" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-button-item>
        <dx-button-options
          width="100%"
          type="default"
          template="signInTemplate"
          :use-submit-behavior="true"
        >
        </dx-button-options>
      </dx-button-item>
      <template #signInTemplate>
        <div>
          <span class="dx-button-text">
            <dx-load-indicator
              v-if="loading"
              width="24px"
              height="24px"
              :visible="true"
            />
            <span v-if="!loading">Log In</span>
          </span>
        </div>
      </template>
    </dx-form>
  </form>
</template>

<script>
import DxLoadIndicator from "devextreme-vue/load-indicator";
import DxForm, {
  DxItem,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
} from "devextreme-vue/form";
import notify from "devextreme/ui/notify";

import auth from "../auth";

import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const formData = reactive({
      id: "",
      password: "",
    });
    const loading = ref(false);

    async function onSubmit() {
      const { id, password } = formData;
      loading.value = true;
      const result = await auth.logIn(id, password);
      if (!result.isOk) {
        loading.value = false;
        notify(result.message, "error", 2000);
      } else {
        router.push(route.query.redirect || "/home");
      }
    }

    return {
      formData,
      loading,
      onCreateAccountClick,
      onSubmit,
    };
  },
  components: {
    DxLoadIndicator,
    DxForm,
    DxEmailRule,
    DxRequiredRule,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions,
  },
};
</script>

<style lang="scss">
@import "../themes/generated/variables.base.scss";

.login-form {
  .link {
    text-align: center;
    font-size: 16px;
    font-style: normal;

    a {
      text-decoration: none;
    }
  }

  .form-text {
    margin: 10px 0;
    color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  }
}
</style>
