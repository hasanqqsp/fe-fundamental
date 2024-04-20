import "./assets/style/styles.css";
import * as components from "./assets/script/components/index";
import home from "./assets/script/view/home";
document.addEventListener("DOMContentLoaded", async () => {
  home();
  const { default: Swal } = await import("sweetalert2");
  window.Swal = Swal;
});
