// MatchStage — scripts de interactividad y validación de formularios
document.addEventListener('DOMContentLoaded', function () {
    // Validación de campos required
    document.querySelectorAll('form').forEach(function (form) {
        form.querySelectorAll('input[required],select[required],textarea[required]').forEach(function (inp) {
            inp.addEventListener('blur', function () {
                if (!inp.value.trim()) {
                    inp.setAttribute('aria-invalid', 'true');
                    inp.classList.add('border-error');
                    var msg = inp.nextElementSibling;
                    if (!msg || !msg.classList.contains('validation-msg')) {
                        msg = document.createElement('p');
                        msg.className = 'validation-msg text-error text-xs mt-1';
                        msg.setAttribute('role', 'alert');
                        inp.parentNode.insertBefore(msg, inp.nextSibling);
                    }
                    msg.textContent = 'Este campo es obligatorio.';
                } else {
                    inp.removeAttribute('aria-invalid');
                    inp.classList.remove('border-error');
                    var m = inp.nextElementSibling;
                    if (m && m.classList.contains('validation-msg')) m.remove();
                }
            });
        });
        form.addEventListener('submit', function (e) {
            var ok = true;
            form.querySelectorAll('input[required],select[required],textarea[required]').forEach(function (inp) {
                if (!inp.value.trim()) { ok = false; inp.dispatchEvent(new Event('blur')); }
            });
            if (!ok) e.preventDefault();
        });
    });
    // Efecto sombra al hacer scroll
    var hdr = document.querySelector('header');
    if (hdr) {
        window.addEventListener('scroll', function () {
            hdr.classList.toggle('shadow-md', window.scrollY > 10);
            hdr.classList.toggle('shadow-sm', window.scrollY <= 10);
        });
    }
});
