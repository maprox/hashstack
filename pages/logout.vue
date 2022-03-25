<script>
export default {
  name: 'LogoutPage',
  middleware({ redirect }) {
    redirect('/home');
  },
  render: () => '',
};
</script>
