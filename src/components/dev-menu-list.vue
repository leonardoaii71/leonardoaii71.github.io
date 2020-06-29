 <template
      v-for="(node, index) in nodes" 
      :key="index" 
      :nodes="node"
      icon="account">
      <b-menu-item label="label"></b-menu-item>
</template>
<script>
export default {
  props: ["label", "nodes"],
  name: 'dev-menu-list'
};
</script>