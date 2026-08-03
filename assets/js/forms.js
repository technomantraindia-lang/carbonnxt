function initForms() {
  Utils.$$('form[data-form]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      if (!validateForm(form)) return

      const type = form.dataset.form
      const endpoint = SITE_CONFIG.endpoints[type] || SITE_CONFIG.endpoints.contact

      const submitBtn = Utils.$('[type="submit"]', form)
      const notice = Utils.$('.form-notice-result', form) || createNotice(form)

      if (!endpoint) {
        notice.textContent = getDemoMessage(type)
        notice.hidden = false
        return
      }

      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.dataset.originalText = submitBtn.textContent
        submitBtn.textContent = 'Sending...'
      }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getFormData(form)),
        })
        if (res.ok) {
          notice.textContent = 'Thank you. Your message has been received.'
          notice.className = 'form-notice form-notice-result'
          form.reset()
        } else {
          throw new Error('Failed')
        }
      } catch {
        notice.textContent = 'Unable to submit at this time. Please contact us directly.'
        notice.className = 'form-notice form-notice-result'
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false
          submitBtn.textContent = submitBtn.dataset.originalText || 'Submit'
        }
        notice.hidden = false
      }
    })
  })
}

function getDemoMessage(type) {
  const messages = {
    contact: 'The contact form interface is ready. Connect the approved email or backend endpoint to activate submissions.',
    newsletter: 'The newsletter form interface is ready. Connect the approved endpoint to activate subscriptions.',
    registration: 'Registration integration is required before account creation becomes active.',
    login: 'Authentication integration is required before account login becomes active.',
    enquiry: 'The enquiry form interface is ready. Connect the approved endpoint to activate submissions.',
  }
  return messages[type] || messages.contact
}

function createNotice(form) {
  const n = document.createElement('p')
  n.className = 'form-notice form-notice-result'
  n.hidden = true
  form.appendChild(n)
  return n
}

function getFormData(form) {
  const data = {}
  Utils.$$('input, select, textarea', form).forEach((field) => {
    if (!field.name || field.type === 'submit') return
    if (field.type === 'checkbox') data[field.name] = field.checked
    else data[field.name] = field.value
  })
  return data
}

function validateForm(form) {
  let valid = true
  Utils.$$('[required]', form).forEach((field) => {
    const group = field.closest('.form-group')
    const err = group ? Utils.$('.form-error', group) : null
    const fieldValid = field.type === 'checkbox' ? field.checked : field.value.trim() !== ''
    if (!fieldValid) {
      valid = false
      if (err) err.textContent = 'This field is required.'
      field.setAttribute('aria-invalid', 'true')
    } else {
      if (err) err.textContent = ''
      field.removeAttribute('aria-invalid')
    }
  })

  const email = Utils.$('input[type="email"]', form)
  if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    valid = false
    const group = email.closest('.form-group')
    const err = group ? Utils.$('.form-error', group) : null
    if (err) err.textContent = 'Please enter a valid email address.'
    email.setAttribute('aria-invalid', 'true')
  }

  return valid
}
