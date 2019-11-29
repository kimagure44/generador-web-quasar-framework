<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat @click="left = !left" round dense icon="menu"></q-btn>
        <q-toolbar-title title="What You See Is What You Get">WYSIWYG Editor</q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="left"
      show-if-above
      :width="200"
      :breakpoint="500"
      side="left"
      behavior="desktop"
      elevated
    ></q-drawer>
    <q-drawer
      v-model="right"
      show-if-above
      :width="200"
      :breakpoint="500"
      side="right"
      behavior="desktop"
      elevated
    ></q-drawer>
    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutAPP',
  data() {
    return {
      left: false,
      right: false,
    };
  },
};
</script>

<style lang="scss">
.menu-list {
  .q-item {
    border-radius: 0 32px 32px 0;
  }
}
</style>
