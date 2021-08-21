import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

export function showError(title: string, message: string) {
  MySwal.fire({
    title,
    icon: 'error',
    text: message,
  });
}

export function showSuccess(title: string) {
  MySwal.fire({
    icon: 'success',
    title,
    showConfirmButton: false,
    timer: 1500,
  })
}

export function confirm(title: string): Promise<boolean> {
  return MySwal.fire({
    title,
    showDenyButton: true,
    confirmButtonText: `Yes`,
    denyButtonText: `No`,
  }).then(res => res.isConfirmed);
}

export function modal(html: JSX.Element) {
  MySwal.fire({
    html,
    showConfirmButton: false,
  });
}

export function closeModal() {
  MySwal.close();
}
