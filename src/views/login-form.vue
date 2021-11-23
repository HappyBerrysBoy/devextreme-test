<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <dx-form :form-data="formData" :disabled="loading">
      <dx-item
        data-field="tmnCod"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Terminal',
          disabled: true,
        }"
      >
        <dx-required-rule message="Terminal is required" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field="id"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Id',
        }"
      >
        <dx-required-rule message="ID is required" />
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
import { mapState, mapActions, mapGetters } from "vuex";

// import Popper from "vue3-popper";
// import "vue3-popperjs/dist/vue-popper.css";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const showInput = false;

    const formData = reactive({
      id: "20013",
      password: "hmm#200349",
      tmnCod: "HUCY",
    });
    const loading = ref(false);

    async function onSubmit() {
      const { tmnCod, id, password } = formData;
      loading.value = true;
      const result = await auth.logIn(tmnCod, id, password);

      console.log("auth loggedin?????????????????????", auth.loggedIn());

      if (!result.isOk) {
        auth._user = result.data;
        loading.value = false;
        notify(result.message, "error", 2000);
      } else {
        router.push(route.query.redirect || "/home");
      }
    }
    return {
      formData,
      showInput,
      loading,
      onSubmit,
    };
  },
  components: {
    DxLoadIndicator,
    DxForm,
    // DxEmailRule,
    DxRequiredRule,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions,
    // popper: Popper,
  },
  methods: {
    ...mapActions({
      incrementIfOddOnRootSum: "moduleA/incrementIfOddOnRootSum",
      setUserInfo: "GlobalConstant/setUserInfo",
    }),
  },
  mounted() {
    // this.$nextTick(function() {
    //   var popper = new Popper(
    //     this.$refs["showInputButton"],
    //     this.$refs["dropdown"],
    //     {
    //       placement: "bottom-start",
    //     }
    //   );
    // });
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
