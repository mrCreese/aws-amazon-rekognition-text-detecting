import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
/* const alertInstance = simpleAlert(loader);
// Per fermare il loading
alertInstance.close(); */
export const loader = {
  title: "Attendere...",
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading();
  },
};
export const simpleAlert = (options) => {
  return MySwal.fire({ ...options });
};
