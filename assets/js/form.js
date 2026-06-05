(function () {
  const GOOGLE_FORM_URL = 'https://forms.gle/m39mnudnTrBV33Ty8';

  const openBtn = document.getElementById('openGoogleForm');
  const status = document.getElementById('formStatus');
  const frameBox = document.getElementById('formEmbedBox');
  const previewForm = document.getElementById('invitationPreviewForm');

  function setState() {
    if (GOOGLE_FORM_URL && GOOGLE_FORM_URL.startsWith('https://')) {
      if (openBtn) {
        openBtn.href = GOOGLE_FORM_URL;
        openBtn.setAttribute('aria-disabled', 'false');
      }

      if (status) {
        status.textContent = 'Google Form is connected and ready for client submissions.';
      }

      if (frameBox) {
        const sep = GOOGLE_FORM_URL.includes('?') ? '&' : '?';
        frameBox.innerHTML = `<iframe title="Google Form" src="${GOOGLE_FORM_URL}${sep}embedded=true" width="100%" height="620" frameborder="0" marginheight="0" marginwidth="0" style="border-radius:18px; border:1px solid rgba(255,255,255,0.18); background:#fff;"></iframe>`;
      }
      return;
    }

    if (openBtn) {
      openBtn.removeAttribute('href');
      openBtn.setAttribute('aria-disabled', 'true');
      openBtn.addEventListener('click', (event) => event.preventDefault());
    }

    if (status) {
      status.textContent = 'Google Form link is pending. Add your form URL in assets/js/form.js to activate this page.';
    }

    if (frameBox) {
      frameBox.innerHTML =
        '<div class="form-note">Embed area reserved for your live Google Form. It will appear automatically after the URL is added.</div>';
    }
  }

  setState();

  if (previewForm) {
    previewForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const submit = previewForm.querySelector('button[type="submit"]');
      if (!submit) return;
      const old = submit.textContent;
      submit.textContent = 'Saved Locally';
      setTimeout(() => {
        submit.textContent = old;
      }, 1300);
    });
  }
})();
