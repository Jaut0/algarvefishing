/* ============================================
   i18n (PT default) — Portal AlgarveFishing
   ============================================ */
(function () {
  'use strict';

  const LANG_STORAGE_KEY = 'portal_lang';
  const SUPPORTED = ['pt', 'en', 'fr', 'de'];

  // Premium, concise, consistent terminology
  const DICT = {
    pt: {
      // Nav / common
      'Início': 'Início',
      'Explorar': 'Explorar',
      'Expedições': 'Expedições',
      'Explorar Saídas': 'Explorar Saídas',
      'Barcos': 'Barcos',
      'Suporte': 'Suporte',
      'Área Cliente': 'Área Cliente',
      'Entrar': 'Entrar',
      'Entrar na Conta': 'Entrar na Conta',
      'Criar Conta': 'Criar Conta',
      'Admin': 'Admin',

      // Hero / CTAs
      'PESCA AO ATUM NO ATLÂNTICO': 'PESCA AO ATUM NO ATLÂNTICO',
      'Viva a adrenalina da pesca profissional ao atum gigante. Barcos equipados, capitães experientes, aventura garantida.':
        'Viva a adrenalina da pesca profissional ao atum gigante. Barcos equipados, capitães experientes, aventura garantida.',
      'RESERVAR EXPEDIÇÃO': 'RESERVAR EXPEDIÇÃO',
      'EXPLORAR SAÍDAS': 'EXPLORAR SAÍDAS',
      'COMO FUNCIONA': 'COMO FUNCIONA',

      // Legal
      'Termos': 'Termos',
      'Privacidade': 'Privacidade',
      'Cancelamentos': 'Cancelamentos',
      'Ver detalhes': 'Ver detalhes',

      // Checkout banners
      'Política de cancelamentos': 'Política de cancelamentos',
      'Até 7 dias: pode cancelar. Menos de 7 dias: decisão do capitão. Mau tempo ou avaria do barco: reembolso total.':
        'Até 7 dias: pode cancelar. Menos de 7 dias: decisão do capitão. Mau tempo ou avaria do barco: reembolso total.',

      // Common buttons
      'Confirmar': 'Confirmar',
      'Cancelar': 'Cancelar',
      'Fechar': 'Fechar',
      'Voltar ao Início': 'Voltar ao Início',
      'Ver Outros Barcos': 'Ver Outros Barcos',

      // Key toasts / UX
      '❌ Por favor, preencha email e password!': '❌ Por favor, preencha email e password!',
      '❌ Email ou password incorretos!': '❌ Email ou password incorretos!',
      '⚠️ Por favor, confirme o seu email antes de fazer login!': '⚠️ Por favor, confirme o seu email antes de fazer login!',
      '📧 Conta não ativada! Verifique o seu email.': '📧 Conta não ativada! Verifique o seu email.',
      '📧 Email reenviado! Verifique a sua caixa de entrada.': '📧 Email reenviado! Verifique a sua caixa de entrada.',
      '✅ Conta criada! Verifique o seu email para ativar a conta.': '✅ Conta criada! Verifique o seu email para ativar a conta.',
      '✅ Reserva confirmada!': '✅ Reserva confirmada!',
      'Pedido enviado com sucesso!': 'Pedido enviado com sucesso!'
    },

    en: {
      // Nav / common
      'Início': 'Home',
      'Explorar': 'Explore',
      'Expedições': 'Expeditions',
      'Explorar Saídas': 'Browse departures',
      'Barcos': 'Boats',
      'Suporte': 'Support',
      'Área Cliente': 'Client Portal',
      'Dashboard': 'Dashboard',
      'Entrar': 'Sign in',
      'Entrar na Conta': 'Sign in',
      'Criar Conta': 'Create account',
      'Sair': 'Sign out',
      'Links Rápidos': 'Quick links',
      'Contacto': 'Contact',
      'Contato': 'Contact',
      'Confirmar': 'Confirm',
      'Cancelar': 'Cancel',
      'Fechar': 'Close',
      'Admin': 'Admin',

      // Hero / marketing
      '🐟 BIG GAME FISHING • ALGARVE': '🐟 BIG GAME FISHING • ALGARVE',
      'PESCA AO ATUM': 'TUNA FISHING',
      'NO ATLÂNTICO': 'IN THE ATLANTIC',
      'PESCA AO ATUM NO ATLÂNTICO': 'TUNA FISHING IN THE ATLANTIC',
      'Viva a adrenalina da pesca profissional ao atum gigante. Barcos equipados, capitães experientes, aventura garantida.':
        'Experience the thrill of professional big tuna fishing. Fully equipped boats, seasoned captains, and an unforgettable day at sea.',
      'Uma plataforma criada por pescadores, para pescadores — porque quem pesca sabe o que quer.':
        'Built by anglers, for anglers — because those who fish know what matters.',
      'COMO FUNCIONA': 'HOW IT WORKS',

      // CTAs
      'RESERVAR EXPEDIÇÃO': 'BOOK AN EXPEDITION',
      'EXPLORAR SAÍDAS': 'BROWSE DEPARTURES',
      'Reservar': 'Book',

      // Legal
      'Termos': 'Terms',
      'Privacidade': 'Privacy',
      'Cancelamentos': 'Cancellations',
      'Ver detalhes': 'View details',

      // Checkout banners
      'Política de cancelamentos': 'Cancellation policy',
      'Até 7 dias: pode cancelar. Menos de 7 dias: decisão do capitão. Mau tempo ou avaria do barco: reembolso total.':
        'Up to 7 days: you may cancel. Less than 7 days: at the captain’s discretion. Bad weather or vessel issues: full refund.',

      // Common buttons
      'Voltar ao Início': 'Back to Home',
      'Voltar ao Dashboard': 'Back to Dashboard',
      'Ver Outros Barcos': 'Browse other boats',
      'Guardar Alterações': 'Save changes',

      // Key toasts / UX
      '❌ Por favor, preencha email e password!': '❌ Please enter your email and password.',
      '❌ Email ou password incorretos!': '❌ Incorrect email or password.',
      '⚠️ Por favor, confirme o seu email antes de fazer login!': '⚠️ Please verify your email before signing in.',
      '📧 Conta não ativada! Verifique o seu email.': '📧 Account not activated. Please check your email.',
      '📧 Email reenviado! Verifique a sua caixa de entrada.': '📧 Email sent again. Please check your inbox.',
      '✅ Conta criada! Verifique o seu email para ativar a conta.': '✅ Account created. Check your email to activate it.',
      '✅ Reserva confirmada!': '✅ Booking confirmed!',
      'Pedido enviado com sucesso!': 'Request sent successfully!'
    },

    fr: {
      // Nav / common
      'Início': 'Accueil',
      'Explorar': 'Explorer',
      'Expedições': 'Expéditions',
      'Explorar Saídas': 'Voir les sorties',
      'Barcos': 'Bateaux',
      'Suporte': 'Assistance',
      'Área Cliente': 'Espace Client',
      'Dashboard': 'Tableau de bord',
      'Entrar': 'Connexion',
      'Entrar na Conta': 'Connexion',
      'Criar Conta': 'Créer un compte',
      'Sair': 'Déconnexion',
      'Links Rápidos': 'Liens rapides',
      'Contacto': 'Contact',
      'Contato': 'Contact',
      'Confirmar': 'Confirmer',
      'Cancelar': 'Annuler',
      'Fechar': 'Fermer',
      'Admin': 'Admin',

      // Hero / marketing
      '🐟 BIG GAME FISHING • ALGARVE': '🐟 BIG GAME FISHING • ALGARVE',
      'PESCA AO ATUM': 'PÊCHE AU THON',
      'NO ATLÂNTICO': 'DANS L’ATLANTIQUE',
      'PESCA AO ATUM NO ATLÂNTICO': 'PÊCHE AU THON DANS L’ATLANTIQUE',
      'Viva a adrenalina da pesca profissional ao atum gigante. Barcos equipados, capitães experientes, aventura garantida.':
        'Vivez l’adrénaline de la pêche professionnelle au thon géant. Bateaux équipés, capitaines expérimentés, aventure garantie.',
      'Uma plataforma criada por pescadores, para pescadores — porque quem pesca sabe o que quer.':
        'Une plateforme conçue par des pêcheurs, pour des pêcheurs — parce que ceux qui pêchent savent ce qu’ils veulent.',
      'COMO FUNCIONA': 'COMMENT ÇA MARCHE',

      // CTAs
      'RESERVAR EXPEDIÇÃO': 'RÉSERVER UNE EXPÉDITION',
      'EXPLORAR SAÍDAS': 'VOIR LES SORTIES',
      'Reservar': 'Réserver',

      // Legal
      'Termos': 'Conditions',
      'Privacidade': 'Confidentialité',
      'Cancelamentos': 'Annulations',
      'Ver detalhes': 'Voir les détails',

      // Checkout banners
      'Política de cancelamentos': 'Politique d’annulation',
      'Até 7 dias: pode cancelar. Menos de 7 dias: decisão do capitão. Mau tempo ou avaria do barco: reembolso total.':
        'Jusqu’à 7 jours : annulation possible. Moins de 7 jours : à la discrétion du capitaine. Mauvais temps ou panne : remboursement intégral.',

      // Common buttons
      'Voltar ao Início': 'Retour à l’accueil',
      'Voltar ao Dashboard': 'Retour au tableau de bord',
      'Ver Outros Barcos': 'Voir d’autres bateaux',
      'Guardar Alterações': 'Enregistrer',

      // Key toasts / UX
      '❌ Por favor, preencha email e password!': '❌ Veuillez renseigner votre email et votre mot de passe.',
      '❌ Email ou password incorretos!': '❌ Email ou mot de passe incorrect.',
      '⚠️ Por favor, confirme o seu email antes de fazer login!': '⚠️ Veuillez vérifier votre email avant de vous connecter.',
      '📧 Conta não ativada! Verifique o seu email.': '📧 Compte non activé. Veuillez vérifier votre email.',
      '📧 Email reenviado! Verifique a sua caixa de entrada.': '📧 Email renvoyé. Vérifiez votre boîte de réception.',
      '✅ Conta criada! Verifique o seu email para ativar a conta.': '✅ Compte créé. Vérifiez votre email pour l’activer.',
      '✅ Reserva confirmada!': '✅ Réservation confirmée !',
      'Pedido enviado com sucesso!': 'Demande envoyée avec succès !'
    },

    de: {
      // Nav / common
      'Início': 'Startseite',
      'Explorar': 'Entdecken',
      'Expedições': 'Expeditionen',
      'Explorar Saídas': 'Ausfahrten ansehen',
      'Barcos': 'Boote',
      'Suporte': 'Support',
      'Área Cliente': 'Kundenbereich',
      'Dashboard': 'Dashboard',
      'Entrar': 'Anmelden',
      'Entrar na Conta': 'Anmelden',
      'Criar Conta': 'Konto erstellen',
      'Sair': 'Abmelden',
      'Links Rápidos': 'Schnelllinks',
      'Contacto': 'Kontakt',
      'Contato': 'Kontakt',
      'Confirmar': 'Bestätigen',
      'Cancelar': 'Abbrechen',
      'Fechar': 'Schließen',
      'Admin': 'Admin',

      // Hero / marketing
      '🐟 BIG GAME FISHING • ALGARVE': '🐟 BIG GAME FISHING • ALGARVE',
      'PESCA AO ATUM': 'THUNFISCHANGELN',
      'NO ATLÂNTICO': 'IM ATLANTIK',
      'PESCA AO ATUM NO ATLÂNTICO': 'THUNFISCHANGELN IM ATLANTIK',
      'Viva a adrenalina da pesca profissional ao atum gigante. Barcos equipados, capitães experientes, aventura garantida.':
        'Erleben Sie den Nervenkitzel des professionellen Thunfischangelns. Voll ausgestattete Boote, erfahrene Kapitäne – ein Tag auf See, der bleibt.',
      'Uma plataforma criada por pescadores, para pescadores — porque quem pesca sabe o que quer.':
        'Von Anglern für Angler – weil echte Fischer wissen, worauf es ankommt.',
      'COMO FUNCIONA': 'SO FUNKTIONIERT’S',

      // CTAs
      'RESERVAR EXPEDIÇÃO': 'EXPEDITION BUCHEN',
      'EXPLORAR SAÍDAS': 'AUSFAHRTEN ANSEHEN',
      'Reservar': 'Buchen',

      // Legal
      'Termos': 'AGB',
      'Privacidade': 'Datenschutz',
      'Cancelamentos': 'Stornierungen',
      'Ver detalhes': 'Details ansehen',

      // Checkout banners
      'Política de cancelamentos': 'Stornierungsbedingungen',
      'Até 7 dias: pode cancelar. Menos de 7 dias: decisão do capitão. Mau tempo ou avaria do barco: reembolso total.':
        'Bis zu 7 Tage: Stornierung möglich. Weniger als 7 Tage: nach Ermessen des Kapitäns. Schlechtwetter oder Bootsausfall: volle Erstattung.',

      // Common buttons
      'Voltar ao Início': 'Zur Startseite',
      'Voltar ao Dashboard': 'Zurück zum Dashboard',
      'Ver Outros Barcos': 'Weitere Boote ansehen',
      'Guardar Alterações': 'Änderungen speichern',

      // Key toasts / UX
      '❌ Por favor, preencha email e password!': '❌ Bitte E-Mail und Passwort eingeben.',
      '❌ Email ou password incorretos!': '❌ Falsche E-Mail oder falsches Passwort.',
      '⚠️ Por favor, confirme o seu email antes de fazer login!': '⚠️ Bitte bestätigen Sie Ihre E-Mail, bevor Sie sich anmelden.',
      '📧 Conta não ativada! Verifique o seu email.': '📧 Konto nicht aktiviert. Bitte prüfen Sie Ihre E-Mail.',
      '📧 Email reenviado! Verifique a sua caixa de entrada.': '📧 E-Mail erneut gesendet. Bitte Posteingang prüfen.',
      '✅ Conta criada! Verifique o seu email para ativar a conta.': '✅ Konto erstellt. Bitte E-Mail prüfen, um es zu aktivieren.',
      '✅ Reserva confirmada!': '✅ Buchung bestätigt!',
      'Pedido enviado com sucesso!': 'Anfrage erfolgreich gesendet!'
    }
  };

  function normalizeLang(lang) {
    if (!lang) return 'pt';
    const l = String(lang).toLowerCase();
    if (SUPPORTED.includes(l)) return l;
    if (l.startsWith('pt')) return 'pt';
    if (l.startsWith('en')) return 'en';
    if (l.startsWith('fr')) return 'fr';
    if (l.startsWith('de')) return 'de';
    return 'pt';
  }

  function getLang() {
    // Default language of the portal is Portuguese.
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved) return normalizeLang(saved);
    } catch (_) {}
    return 'pt';
  }

  function setLang(lang) {
    const l = normalizeLang(lang);
    try { localStorage.setItem(LANG_STORAGE_KEY, l); } catch (_) {}
    applyI18n(l);
    updateSwitcherUI(l);
  }

  function t(ptText, lang) {
    const l = normalizeLang(lang || getLang());
    if (l === 'pt') return ptText;
    return (DICT[l] && DICT[l][ptText]) ? DICT[l][ptText] : ptText;
  }

  // ------------------------------------------------------------
  // Translation engine
  // ------------------------------------------------------------
  // We avoid relying on *current* text (which changes after switching language).
  // Instead, we attach the original PT text to elements via data-i18n.

  function annotateElementsWithKeys() {
    // We store the original PT text once, so switching languages remains stable.
    const candidates = document.querySelectorAll('a, button, label, h1, h2, h3, h4, p, span, small, strong');
    candidates.forEach(el => {
      if (el.hasAttribute('data-i18n')) return;

      const raw = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (!raw) return;

      // Safety: do not try to translate long paragraphs (legal pages) in this first pass
      if (raw.length > 140) return;

      // Avoid purely numeric / symbols
      if (/^[0-9\s\-+.,€$%]+$/.test(raw)) return;

      // Avoid version badges etc.
      if (/^v\d+(\.\d+)*$/i.test(raw)) return;

      // Keep brand as-is
      if (raw === 'ALGARVE TUNA CHARTER' || raw === 'Algarve Tuna Charter') return;

      el.setAttribute('data-i18n', raw);
    });

    // placeholders & titles
    document.querySelectorAll('[placeholder]').forEach(el => {
      if (el.hasAttribute('data-i18n-placeholder')) return;
      const ph = (el.getAttribute('placeholder') || '').trim();
      if (!ph || ph.length > 140) return;
      el.setAttribute('data-i18n-placeholder', ph);
    });

    document.querySelectorAll('[title]').forEach(el => {
      if (el.hasAttribute('data-i18n-title')) return;
      const ti = (el.getAttribute('title') || '').trim();
      if (!ti || ti.length > 140) return;
      el.setAttribute('data-i18n-title', ti);
    });
  }

  function applyTranslations(lang) {
    const l = normalizeLang(lang);

    // Elements with a key
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = t(key, l);

      // Preserve icons: if element contains <i> or other elements,
      // replace only its text nodes (first meaningful one)
      const hasChildElements = el.children && el.children.length > 0;
      if (!hasChildElements) {
        el.textContent = translated;
        return;
      }

      // Replace first non-empty text node
      let replaced = false;
      el.childNodes.forEach(n => {
        if (replaced) return;
        if (n.nodeType === Node.TEXT_NODE) {
          const raw = n.nodeValue || '';
          const trimmed = raw.replace(/\s+/g, ' ').trim();
          if (!trimmed) return;
          n.nodeValue = raw.replace(trimmed, translated);
          replaced = true;
        }
      });

      // Fallback: if no text node found, set aria-label
      if (!replaced) {
        el.setAttribute('aria-label', translated);
      }
    });

    // placeholders/titles using keyed attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key, l));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.setAttribute('title', t(key, l));
    });
  }

  // (attributes are handled in applyTranslations via data-i18n-placeholder/title)

  function injectSwitcher() {
    if (document.getElementById('langSwitcher')) return;

    const styleId = 'langSwitcherStyle';
    if (!document.getElementById(styleId)) {
      const st = document.createElement('style');
      st.id = styleId;
      st.textContent = `
        .lang-switcher{position:fixed;top:14px;right:14px;z-index:9999;display:flex;gap:6px;padding:6px 8px;border-radius:999px;background:rgba(10,22,40,.55);backdrop-filter: blur(10px);border:1px solid rgba(255,255,255,.14);box-shadow:0 10px 25px rgba(0,0,0,.18)}
        .lang-btn{width:34px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:10px;font-size:18px;line-height:1;transition:.2s ease;opacity:.85}
        .lang-btn:hover{transform:translateY(-1px);opacity:1;background:rgba(255,255,255,.10)}
        .lang-btn.active{opacity:1;background:rgba(255,143,0,.22);border:1px solid rgba(255,143,0,.35)}
        @media (max-width: 768px){.lang-switcher{top:10px;right:10px}}
      `;
      document.head.appendChild(st);
    }

    const sw = document.createElement('div');
    sw.id = 'langSwitcher';
    sw.className = 'lang-switcher';
    sw.innerHTML = `
      <button class="lang-btn" data-lang="pt" aria-label="Português" title="Português">🇵🇹</button>
      <button class="lang-btn" data-lang="en" aria-label="English" title="English">🇬🇧</button>
      <button class="lang-btn" data-lang="fr" aria-label="Français" title="Français">🇫🇷</button>
      <button class="lang-btn" data-lang="de" aria-label="Deutsch" title="Deutsch">🇩🇪</button>
    `;
    document.body.appendChild(sw);

    sw.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      setLang(btn.getAttribute('data-lang'));
    });
  }

  function updateSwitcherUI(lang) {
    const sw = document.getElementById('langSwitcher');
    if (!sw) return;
    sw.querySelectorAll('button[data-lang]').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }

  function patchToasts(lang) {
    // Translate toast messages without changing JS everywhere
    if (typeof window.mostrarToast === 'function' && !window.__i18nToastPatched) {
      const original = window.mostrarToast;
      window.mostrarToast = function (msg, tipo) {
        try {
          if (typeof msg === 'string') msg = t(msg, lang);
        } catch (_) {}
        return original.call(this, msg, tipo);
      };
      window.__i18nToastPatched = true;
    }
  }

  function patchDialogs(lang) {
    // Translate alert/confirm/prompt for a more complete UX
    if (!window.__i18nDialogPatched) {
      const _alert = window.alert;
      const _confirm = window.confirm;
      const _prompt = window.prompt;

      window.alert = function (msg) {
        try { if (typeof msg === 'string') msg = t(msg, lang); } catch (_) {}
        return _alert.call(this, msg);
      };

      window.confirm = function (msg) {
        try { if (typeof msg === 'string') msg = t(msg, lang); } catch (_) {}
        return _confirm.call(this, msg);
      };

      window.prompt = function (msg, def) {
        try { if (typeof msg === 'string') msg = t(msg, lang); } catch (_) {}
        return _prompt.call(this, msg, def);
      };

      window.__i18nDialogPatched = true;
    }
  }

  function applyI18n(lang) {
    const l = normalizeLang(lang);

    injectSwitcher();
    updateSwitcherUI(l);

    // Key (PT) texts once; re-run to catch dynamic content
    annotateElementsWithKeys();
    applyTranslations(l);

    patchToasts(l);
    patchDialogs(l);

    // mark current language for CSS hooks if needed
    document.documentElement.setAttribute('lang', l);
    document.documentElement.setAttribute('data-lang', l);
  }

  // Expose small API
  window.PortalI18n = {
    getLang,
    setLang,
    t
  };

  document.addEventListener('DOMContentLoaded', () => {
    applyI18n(getLang());
  });
})();
