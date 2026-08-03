function initAuthUI() {
  initPasswordToggle()
  initLoginForm()
  initRegisterForm()
}

function initPasswordToggle() {
  Utils.$$('.password-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target)
      if (!input) return
      const show = input.type === 'password'
      input.type = show ? 'text' : 'password'
      btn.textContent = show ? 'Hide' : 'Show'
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password')
    })
  })
}

function initLoginForm() {
  const form = Utils.$('#login-form')
  if (!form) return
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!validateForm(form)) return
    const notice = Utils.$('.auth-notice', form.parentElement)
    if (notice) {
      notice.textContent = 'Authentication integration is required before account login becomes active.'
      notice.hidden = false
    }
  })
}

function initRegisterForm() {
  const form = Utils.$('#register-form')
  if (!form) return

  let step = 1
  const step1 = Utils.$('#register-step-1', form)
  const step2 = Utils.$('#register-step-2', form)
  const steps = Utils.$$('.auth-step', form.parentElement)

  Utils.$$('.account-type', form).forEach((btn) => {
    btn.addEventListener('click', () => {
      Utils.$$('.account-type', form).forEach((b) => b.classList.remove('is-selected'))
      btn.classList.add('is-selected')
      Utils.$('#account-type-input').value = btn.dataset.type
    })
  })

  Utils.$('#register-next')?.addEventListener('click', () => {
    const selected = Utils.$('.account-type.is-selected', form)
    if (!selected) return
    step = 2
    step1.hidden = true
    step2.hidden = false
    steps[0]?.classList.add('is-done')
    steps[1]?.classList.add('is-active')
  })

  Utils.$('#register-back')?.addEventListener('click', () => {
    step = 1
    step1.hidden = false
    step2.hidden = true
    steps[1]?.classList.remove('is-active')
  })

  const pw = Utils.$('#password', form)
  const bar = Utils.$('.password-strength__bar', form)
  pw?.addEventListener('input', () => {
    const v = pw.value
    let score = 0
    if (v.length >= 8) score++
    if (/[A-Z]/.test(v)) score++
    if (/[0-9]/.test(v)) score++
    if (/[^A-Za-z0-9]/.test(v)) score++
    const widths = ['0%', '25%', '50%', '75%', '100%']
    const colors = ['transparent', '#ff6b6b', '#feca57', '#39E878', '#70F5A5']
    if (bar) {
      bar.style.width = widths[score]
      bar.style.background = colors[score]
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!validateForm(form)) return
    const confirm = Utils.$('#confirm-password', form)
    if (pw && confirm && pw.value !== confirm.value) {
      const err = Utils.$('#confirm-password-error')
      if (err) err.textContent = 'Passwords do not match.'
      return
    }
    const notice = Utils.$('.auth-notice', form.parentElement)
    if (notice) {
      notice.textContent = 'Registration integration is required before account creation becomes active.'
      notice.hidden = false
    }
  })
}
