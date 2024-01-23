<template>
  <div>
    <a href="https://github.com/SoominYim" title="git_hub" class="sns" target="blank">
      <i class="fa-brands fa-github"></i>
    </a>
    <a href="https://www.instagram.com/_soo_min_/" title="instagram" class="sns" target="blank">
      <i class="fa-brands fa-instagram"></i>
    </a>
    <a href="https://www.facebook.com/profile.php?id=100002681110982" title="facebook" class="sns" target="blank"> <i
        class="fa-brands fa-facebook"></i>
    </a>
    <a href="https://s-o-o-min.tistory.com/" title="tistory" class="sns" target="blank"> <i class="fa-solid fa-t"></i></a>
    <span>© {{ new Date().getFullYear() }}. S-o-o-Min . All rights reserved.</span>
  </div>
</template>

<script>
export default {
  name: "BlogFooter",
};
</script>

<style lang="scss" scoped>
div {
  height: 40px;
  text-align: center;

  .sns {
    color: #fff;
    font-size: 20px;
    padding: 0 10px;

    &:hover {
      color: #888;
    }

    transition: all 0.5s ease;
  }

  span {
    font-size: 10px;
    display: block;
    height: 10px;
    margin-top: 6px;
    color: #fff;
  }
}
</style>