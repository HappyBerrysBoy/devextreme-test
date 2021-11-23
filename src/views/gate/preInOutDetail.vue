<template>
  <DxPopup
    :drag-enabled="false"
    :close-on-outside-click="true"
    :show-close-button="false"
    :show-title="true"
    :width="300"
    :height="280"
    container=".dx-viewport"
    title="Pre Gate In/Out Detail Information"
  >
    <DxPosition at="center center" my="center center" v-model:of="positionOf" />
    <p>
      자동 추천 로직 이거... 너무 뜬금없네
    </p>
    <!-- <DxToolbarItem
      widget="dxButton"
      toolbar="bottom"
      location="before"
      :options="emailButtonOptions"
    />
    <DxToolbarItem
      widget="dxButton"
      toolbar="bottom"
      location="after"
      :options="closeButtonOptions"
    /> -->
    <!-- <p>
        Full Name:
        <span>{{ currentEmployee.FirstName }}</span>
        <span>{{ currentEmployee.LastName }}</span>
      </p>
      <p>
        Birth Date: <span>{{ currentEmployee.BirthDate }}</span>
      </p>
      <p>
        Address: <span>{{ currentEmployee.Address }}</span>
      </p>
      <p>
        Hire Date: <span>{{ currentEmployee.HireDate }}</span>
      </p>
      <p>
        Position: <span>{{ currentEmployee.Position }}</span>
      </p> -->
  </DxPopup>
</template>
