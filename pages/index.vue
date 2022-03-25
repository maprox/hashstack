<script>
export default {
  name: 'IndexPage',
  middleware({ redirect }) {
    redirect('/home');
  },
  render: () => '',
};
</script>
