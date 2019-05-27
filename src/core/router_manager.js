const routerManager = {
  push(url, params, self) {
    // self.$f7router.navigate(url, {
    //   props: params
    // });
    self.$f7router.navigate({
      name: url,
      // params: {
      //     params: 'hhhhh',
      //     index: 100
      // },
      query: params
    });
  },

  pop(url, options, self) {
    if (url == undefined) {
      self.$f7router.back();
    } else {
      self.$f7.views.main.router.back(url, { force: true });
    }
  }
};

export default routerManager;
