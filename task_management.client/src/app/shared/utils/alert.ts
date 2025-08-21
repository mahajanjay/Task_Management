import swal from 'sweetalert2';

export function alertSuccess(title: string, text?: string, options?: { 
    showConfirmButton?: boolean,
    confirmButtonText?: string,
}) {    
    swal.fire({
    icon: 'success',
    title: title,
    text: text || '',
    confirmButtonText: 'OK',
    ...options
  });
}

export function alertError(title: string, text?: string) {
    swal.fire({
        icon: 'error',
        title: title,
        text: text || '',
        confirmButtonText: 'OK'
    });
}

export function alertWarning(title: string, text?: string) {
    swal.fire({
        icon: 'warning',
        title: title,
        text: text || '',
        confirmButtonText: 'OK'
    });
}

export function alertInfo(title: string, text?: string, options?: { 
    showConfirmButton?: boolean,
    confirmButtonText?: string,
    showCancelButton?: boolean,
    cancelButtonText?: string,
}) {
    swal.fire({
        icon: 'info',
        title: title,
        text: text || '',
        confirmButtonText: 'OK',
        ...options
    });
}