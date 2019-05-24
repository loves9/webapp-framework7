const routerManager = {
  push(url, props, self) {
    self.$f7router.navigate(url, {
      props: props
    });
  },

  pop(url, props, self) {
    if (url == undefined) {
      self.$f7router.back();

    } else {
      self.$f7router.back(url, {
        props:props
      });
      // self.$f7router.navigate(url, {
      //   props: props
      // });
    }
  }
};

export default routerManager;
