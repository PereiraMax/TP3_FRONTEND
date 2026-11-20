/**
 * MATCHDEVERDAD · CONTROLADOR INTERACTIVO DE LANDING PAGE (TP3)
 * IFTS 29 · Desarrollo de Sistemas Web · Front End 2026
 * Características:
 * - Acordeones accesibles por teclado (Enter / Espacio / ARIA)
 * - Conmutador de pestañas de diagramas de flujo SVG
 * - Recorrido de casos de ejemplo (ilustrativo: no ejecuta agentes ni servicios reales)
 * - Spy de navegación para seguimiento en escritorio
 */

document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initDiagramTabs();
  initSimulator();
  initNavScrollSpy();
  initMobileNav();
});

/* ==========================================================================
   1. ACCORDIONS / DESPLEGABLES ACCESIBLES
   ========================================================================== */
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      toggleAccordion(item, !isOpen);
    });

    // Keyboard support: Enter / Space
    trigger.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const isOpen = item.classList.contains('open');
        toggleAccordion(item, !isOpen);
      }
    });
  });

  // Recalcula la altura de los paneles abiertos cuando cambia el ancho de pantalla
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      accordionItems.forEach(item => {
        if (item.classList.contains('open')) {
          const panel = item.querySelector('.accordion-panel');
          if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }, 120);
  });

  // Global toggle buttons (Expandir todos / Colapsar todos)
  const btnExpandAll = document.getElementById('btn-expand-all');
  const btnCollapseAll = document.getElementById('btn-collapse-all');

  if (btnExpandAll) {
    btnExpandAll.addEventListener('click', () => {
      accordionItems.forEach(item => toggleAccordion(item, true));
    });
  }

  if (btnCollapseAll) {
    btnCollapseAll.addEventListener('click', () => {
      accordionItems.forEach(item => toggleAccordion(item, false));
    });
  }
}

function toggleAccordion(item, open) {
  const trigger = item.querySelector('.accordion-trigger');
  const panel = item.querySelector('.accordion-panel');

  if (open) {
    item.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  } else {
    item.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = '0px';
  }
}

/* ==========================================================================
   2. DIAGRAM TABS SWITCHER
   ========================================================================== */
function initDiagramTabs() {
  const tabButtons = document.querySelectorAll('.diagram-tab-btn');
  const tabPanes = document.querySelectorAll('.diagram-content-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. RECORRIDO DE CASOS DE EJEMPLO (ILUSTRATIVO)
   Usa DOS variables de cupo distintas, porque el cupo se revisa en dos momentos:
   - faltanAlProponer: lo evalúa R4 cuando se propone el candidato.
   - faltanAlEnviar:   lo revalida R3 justo antes de solicitar el envío
                       (puede haber cambiado mientras el organizador decidía).
   ========================================================================== */
function initSimulator() {
  const presetButtons = document.querySelectorAll('.sim-preset-btn');
  const runBtn = document.getElementById('btn-run-simulation');
  const consoleOutput = document.getElementById('sim-logs-container');
  const statusBadge = document.getElementById('sim-status-badge');

  // Elementos de entrada
  const inputFaltanPropone = document.getElementById('sim-faltan');
  const inputFaltanEnvio = document.getElementById('sim-faltan-envio');
  const inputAutorizado = document.getElementById('sim-autorizado');
  const inputRespuestaOrg = document.getElementById('sim-org-decision');
  const inputCompatible = document.getElementById('sim-compatible');
  const inputInvitacionVigente = document.getElementById('sim-inv-vigente');

  // Casos preconfigurados
  const presets = {
    'happy-path': {
      faltanAlProponer: true,
      faltanAlEnviar: true,
      autorizado: false,
      orgDecision: 'autoriza',
      compatible: true,
      invVigente: false,
      candidato: 'Lucas'
    },
    'duplicada': {
      faltanAlProponer: true,
      faltanAlEnviar: true,
      autorizado: true,
      orgDecision: 'autoriza',
      compatible: true,
      invVigente: true,
      candidato: 'Lucas'
    },
    'partido-completo': {
      // Al proponer faltaban jugadores (R4 pide permiso); mientras el organizador
      // decidía se completó el cupo, y R3 lo detecta al revalidar.
      faltanAlProponer: true,
      faltanAlEnviar: false,
      autorizado: false,
      orgDecision: 'autoriza',
      compatible: true,
      invVigente: false,
      candidato: 'Lucas'
    },
    'rechazado': {
      faltanAlProponer: true,
      faltanAlEnviar: true,
      autorizado: false,
      orgDecision: 'rechaza',
      compatible: true,
      invVigente: false,
      candidato: 'Marcos'
    },
    'sin-respuesta': {
      faltanAlProponer: true,
      faltanAlEnviar: true,
      autorizado: false,
      orgDecision: 'sin_respuesta',
      compatible: true,
      invVigente: false,
      candidato: 'Marcos'
    }
  };

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const config = presets[btn.getAttribute('data-preset')];
      if (!config) return;

      if (inputFaltanPropone) inputFaltanPropone.checked = config.faltanAlProponer;
      if (inputFaltanEnvio) inputFaltanEnvio.checked = config.faltanAlEnviar;
      if (inputAutorizado) inputAutorizado.checked = config.autorizado;
      if (inputRespuestaOrg) inputRespuestaOrg.value = config.orgDecision;
      if (inputCompatible) inputCompatible.checked = config.compatible;
      if (inputInvitacionVigente) inputInvitacionVigente.checked = config.invVigente;

      runCase(config.candidato);
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      // Al tocar variables a mano deja de valer un caso preconfigurado
      presetButtons.forEach(b => b.classList.remove('active'));
      runCase('Candidato');
    });
  }

  function runCase(candidateName = 'Lucas') {
    const faltanAlProponer = inputFaltanPropone ? inputFaltanPropone.checked : true;
    const faltanAlEnviar = inputFaltanEnvio ? inputFaltanEnvio.checked : true;
    const yaAutorizado = inputAutorizado ? inputAutorizado.checked : false;
    const orgDecision = inputRespuestaOrg ? inputRespuestaOrg.value : 'autoriza';
    const compatible = inputCompatible ? inputCompatible.checked : true;
    const invVigente = inputInvitacionVigente ? inputInvitacionVigente.checked : false;

    const logs = [];
    let n = 0;
    const log = (label, text) => {
      n += 1;
      logs.push({ step: `${String(n).padStart(2, '0')}. ${label}`, text });
    };
    const finish = (state, msg) => renderLogs(logs, state, msg);

    log('EVENTO DE ENTRADA', `El sistema propone a <strong>${candidateName}</strong> para el partido de Fútbol 5.`);

    // ==========================================
    // ETAPA 1 · R4 (PEDIR PERMISO)
    // ==========================================
    log('R4 · CUPO AL PROPONER', `¿Todavía faltan jugadores? → <strong>${faltanAlProponer ? 'SÍ (menos de 10 confirmados)' : 'NO (cupo 10/10 completo)'}</strong>.`);

    if (!faltanAlProponer) {
      log('R4 [⚙ DISEÑO]', 'El partido ya está completo. Según la decisión de diseño Nº 11, no se pide permiso al organizador y el flujo termina.');
      return finish('blocked', 'FLUJO DETENIDO: partido completo, no se pide permiso ni se envía invitación.');
    }

    log('R4 · AUTORIZACIÓN', `¿Consta autorización del organizador para ${candidateName}? → <strong>${yaAutorizado ? 'SÍ' : 'NO'}</strong>.`);

    if (yaAutorizado) {
      log('R4 · YA AUTORIZADO', 'Ya constaba la autorización: R4 no pide nada y corresponde R3.');
    } else {
      log('R4 · ACCIÓN', 'Se aplica R4: el sistema <strong>solicita el permiso al organizador y NO envía la invitación</strong>.');
      log('INTERVENCIÓN HUMANA', `El organizador evalúa la solicitud. Decisión: <strong>${orgDecision.replace('_', ' ').toUpperCase()}</strong>.`);

      if (orgDecision === 'sin_respuesta') {
        log('R4 [⚙ DISEÑO]', `El organizador no respondió. Según la decisión Nº 10, ${candidateName} queda en espera y <strong>no se envía nada</strong>.`);
        return finish('pending', 'EN ESPERA: el candidato aguarda la respuesta del organizador.');
      }

      if (orgDecision === 'rechaza') {
        log('R4 [⚙ DISEÑO]', `El organizador rechazó a ${candidateName}. Según la decisión Nº 7, se registra el rechazo y se descarta al candidato.`);
        return finish('blocked', 'CANDIDATO DESCARTADO: rechazo del organizador registrado.');
      }

      log('R4 [⚙ DISEÑO]', `El organizador autorizó a ${candidateName}. Se registra la autorización (decisión Nº 12) y el caso pasa a R3.`);
    }

    // ==========================================
    // ETAPA 2 · R3 (SOLICITAR EL ENVÍO)
    // El tiempo pasó: R3 vuelve a revisar los datos actuales.
    // ==========================================
    log('R3 · INICIO', 'Condición 1 de 4 (el organizador autorizó invitarlo) ya cumplida. R3 revalida con los datos actuales.');

    log('R3 · CONDICIÓN 2 DE 4', `¿${candidateName} sigue siendo compatible (zona, horario, posición)? → <strong>${compatible ? 'SÍ' : 'NO'}</strong>.`);
    if (!compatible) {
      log('R3 [⚙ DISEÑO]', 'Falló la compatibilidad. Según la decisión Nº 8, se registra la causa («ya no es compatible») y NO se envía la invitación.');
      return finish('blocked', 'ENVÍO CANCELADO: el candidato ya no es compatible.');
    }

    log('R3 · CONDICIÓN 3 DE 4', `Cupo al momento de enviar: ¿todavía faltan jugadores? → <strong>${faltanAlEnviar ? 'SÍ' : 'NO (se completó mientras esperaba)'}</strong>.`);
    if (!faltanAlEnviar) {
      log('R3 [⚙ DISEÑO]', 'Falló el cupo: el partido se completó entre la autorización y el envío. Según la decisión Nº 8, se registra «partido completo» y NO se envía la invitación.');
      return finish('blocked', 'ENVÍO CANCELADO: el partido se completó mientras se esperaba la autorización.');
    }

    log('R3 · CONDICIÓN 4 DE 4', `¿Ya hay una invitación vigente para ${candidateName} en este partido? → <strong>${invVigente ? 'SÍ (enviada y sin responder)' : 'NO'}</strong>.`);
    if (invVigente) {
      log('R3 [⚙ DISEÑO]', 'Ya existe una invitación vigente (definición de «vigente»: decisión Nº 6). Según la decisión Nº 8, se registra el motivo y NO se reenvía.');
      return finish('blocked', 'ENVÍO CANCELADO: ya existe una invitación vigente para este jugador.');
    }

    log('R3 · ACCIÓN', '<strong>Se cumplen las 4 condiciones.</strong> El sistema solicita enviar la invitación al candidato.');
    log('R3 · RESULTADO [⚙ DISEÑO]', `La solicitud se dirige a la función de envío de la app (decisión Nº 9) para invitar a ${candidateName}.`);

    return finish('success', `RECORRIDO COMPLETO: se solicita enviar la invitación a ${candidateName}.`);
  }

  function renderLogs(logs, state, resultMsg) {
    if (!consoleOutput) return;

    let html = '';
    logs.forEach(entry => {
      html += `
        <div class="sim-log-item">
          <span class="sim-log-step">[${entry.step}]</span>
          <span class="sim-log-text">${entry.text}</span>
        </div>
      `;
    });

    html += `
      <div class="sim-log-result ${state}">
        ${resultMsg}
      </div>
    `;

    consoleOutput.innerHTML = html;

    if (statusBadge) {
      if (state === 'success') {
        statusBadge.textContent = 'RESULTADO: SE SOLICITA EL ENVÍO';
        statusBadge.style.background = '#059669';
      } else if (state === 'blocked') {
        statusBadge.textContent = 'RESULTADO: NO SE ENVÍA';
        statusBadge.style.background = '#e11d48';
      } else {
        statusBadge.textContent = 'RESULTADO: EN ESPERA DEL ORGANIZADOR';
        statusBadge.style.background = '#d97706';
      }
      statusBadge.style.color = '#ffffff';
    }
  }

  // Caso inicial al cargar
  runCase('Lucas');
}

/* ==========================================================================
   4. NAVIGATION SCROLL SPY
   ========================================================================== */
function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
      }
    });
  }, { passive: true });
}


/* ==========================================================================
   5. MENÚ DE NAVEGACIÓN MÓVIL (HAMBURGUESA)
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));

  // Cerrar al elegir una sección
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));

  // Cerrar con Escape (devuelve el foco al botón)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Cerrar al pasar a escritorio
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}