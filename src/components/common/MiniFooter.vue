<template>
  <div class="footer">
    <a href="https://github.com/SoominYim" title="git_hub" class="sns" target="blank">
      <i class="fa-brands fa-github"></i>
    </a>
    <a href="https://www.instagram.com/_soo_min_/" title="instagram" class="sns" target="blank">
      <i class="fa-brands fa-instagram"></i>
    </a>
    <a href="https://www.facebook.com/profile.php?id=100002681110982" title="facebook" class="sns" target="blank">
      <i class="fa-brands fa-facebook"></i>
    </a>
    <a href="https://s-o-o-min.tistory.com/" title="tistory" class="sns" target="blank">
      <i class="fa-solid fa-t"></i
    ></a>
    <span>© {{ new Date().getFullYear() }}. S-o-o-Min . All rights reserved.</span>
  </div>
</template>

<script>
export default {
  name: "BlogFooter",
};
</script>

<style lang="scss">
.footer {
  background: none;
  position: absolute;
  left: calc(50% - 158.31px / 2);
  bottom: 1vh;
  text-align: center;
  .sns {
    color: #000;
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
    margin-top: 6px;
    color: #000;
  }
}

@media screen and (min-width: 1280px) {
  .footer {
    left: calc(50% + 50px);
  }
}
</style>
