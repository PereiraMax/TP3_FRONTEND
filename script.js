/**
 * MATCHDEVERDAD · CONTROLADOR INTERACTIVO DE LANDING PAGE (TP3)
 * IFTS 29 · Desarrollo de Sistemas Web · Front End 2026
 * Características:
 * - Acordeones accesibles por teclado (Enter / Espacio / ARIA)
 * - Conmutador de pestañas de diagramas de flujo SVG
 * - Simulador de decisiones agénticas con casos preconfigurados y modo manual
 * - Spy de navegación para seguimiento en escritorio
 */

document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initDiagramTabs();
  initSimulator();
  initNavScrollSpy();
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

    // Keyboard support: Enter / Space (standard button behavior, enhanced for clarity)
    trigger.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const isOpen = item.classList.contains('open');
        toggleAccordion(item, !isOpen);
      }
    });
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

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. AGENTIC FLOW SIMULATOR (SIMULADOR DE DECISIONES)
   ========================================================================== */
function initSimulator() {
  const presetButtons = document.querySelectorAll('.sim-preset-btn');
  const runBtn = document.getElementById('btn-run-simulation');
  const consoleOutput = document.getElementById('sim-logs-container');
  const statusBadge = document.getElementById('sim-status-badge');

  // Input elements
  const inputFaltan = document.getElementById('sim-faltan');
  const inputAutorizado = document.getElementById('sim-autorizado');
  const inputRespuestaOrg = document.getElementById('sim-org-decision');
  const inputCompatible = document.getElementById('sim-compatible');
  const inputInvitacionVigente = document.getElementById('sim-inv-vigente');

  // Preset Configurations
  const presets = {
    'happy-path': {
      faltan: true,
      autorizado: false,
      orgDecision: 'autoriza',
      compatible: true,
      invVigente: false,
      candidato: 'Lucas',
      nombre: 'Caso Éxito R4 a R3 (Lucas)'
    },
    'duplicada': {
      faltan: true,
      autorizado: true,
      orgDecision: 'autoriza',
      compatible: true,
      invVigente: true,
      candidato: 'Lucas',
      nombre: 'Excepción R3: Invitación vigente duplicada'
    },
    'partido-completo': {
      faltan: false, // 10 jugadores ya confirmados
      autorizado: true,
      orgDecision: 'autoriza',
      compatible: true,
      invVigente: false,
      candidato: 'Lucas',
      nombre: 'Excepción R3: Partido completado durante espera'
    },
    'rechazado': {
      faltan: true,
      autorizado: false,
      orgDecision: 'rechaza',
      compatible: true,
      invVigente: false,
      candidato: 'Marcos',
      nombre: 'Excepción R4: Organizador rechaza a Marcos'
    },
    'sin-respuesta': {
      faltan: true,
      autorizado: false,
      orgDecision: 'sin_respuesta',
      compatible: true,
      invVigente: false,
      candidato: 'Marcos',
      nombre: 'Excepción R4: Organizador no responde (Espera)'
    }
  };

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const presetKey = btn.getAttribute('data-preset');
      const config = presets[presetKey];

      if (config) {
        if (inputFaltan) inputFaltan.checked = config.faltan;
        if (inputAutorizado) inputAutorizado.checked = config.autorizado;
        if (inputRespuestaOrg) inputRespuestaOrg.value = config.orgDecision;
        if (inputCompatible) inputCompatible.checked = config.compatible;
        if (inputInvitacionVigente) inputInvitacionVigente.checked = config.invVigente;

        runSimulationWithParams(config.candidato);
      }
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      runSimulationWithParams('Candidato');
    });
  }

  function runSimulationWithParams(candidateName = 'Lucas') {
    const faltan = inputFaltan ? inputFaltan.checked : true;
    const yaAutorizado = inputAutorizado ? inputAutorizado.checked : false;
    const orgDecision = inputRespuestaOrg ? inputRespuestaOrg.value : 'autoriza';
    const compatible = inputCompatible ? inputCompatible.checked : true;
    const invVigente = inputInvitacionVigente ? inputInvitacionVigente.checked : false;

    let logs = [];
    let finalState = 'success'; // success, blocked, pending
    let finalMsg = '';

    logs.push({
      step: '01. EVENTO DE ENTRADA',
      text: `El sistema matcher propone a <strong>${candidateName}</strong> para el partido de Fútbol 5.`
    });

    // ==========================================
    // ETAPA 1: EVALUACIÓN DE R4 (PERMISO)
    // ==========================================
    logs.push({
      step: '02. EVALUACIÓN R4',
      text: `Comprobando precondición: ¿Todavía faltan jugadores? → <strong>${faltan ? 'SÍ (faltan jugadores)' : 'NO (cupo 10/10 completo)'}</strong>.`
    });

    if (!faltan) {
      logs.push({
        step: '03. R4 [⚙ DISEÑO]',
        text: `El partido ya está completo. Según la decisión de diseño Nº 11, no se solicita permiso al organizador y el flujo finaliza.`
      });
      finalState = 'blocked';
      finalMsg = 'FLUJO DETENIDO: Partido completo (no se envía invitación).';
      renderLogs(logs, finalState, finalMsg);
      return;
    }

    logs.push({
      step: '04. EVALUACIÓN R4',
      text: `¿Consta autorización previa del organizador para ${candidateName}? → <strong>${yaAutorizado ? 'SÍ' : 'NO'}</strong>.`
    });

    let pasaAR3 = false;

    if (yaAutorizado) {
      logs.push({
        step: '05. R4 DIRECTO',
        text: `El candidato ya contaba con autorización previa registrada. Se cumple la transición directa y pasa inmediatamente a R3.`
      });
      pasaAR3 = true;
    } else {
      logs.push({
        step: '05. ACCIÓN R4',
        text: `Se activa Frase 2 (R4): El sistema solicita el permiso al organizador y <strong>NO envía la invitación</strong>.`
      });

      logs.push({
        step: '06. INTERVENCIÓN HUMANA',
        text: `El organizador evalúa la solicitud en su dispositivo. Decisión registrada: <strong>${orgDecision.toUpperCase()}</strong>.`
      });

      if (orgDecision === 'sin_respuesta') {
        logs.push({
          step: '07. R4 [⚙ DISEÑO]',
          text: `El organizador no respondió aún. Según la regla y decisión de diseño Nº 10, ${candidateName} queda en lista de espera y <strong>no se envía nada</strong>.`
        });
        finalState = 'pending';
        finalMsg = 'EN ESPERA: Candidato aguarda la respuesta humana del organizador.';
        renderLogs(logs, finalState, finalMsg);
        return;
      } else if (orgDecision === 'rechaza') {
        logs.push({
          step: '07. R4 [⚙ DISEÑO]',
          text: `El organizador rechazó a ${candidateName}. Según la decisión de diseño Nº 7, se registra el rechazo en base de datos y se descarta al candidato sin entrar en bucle.`
        });
        finalState = 'blocked';
        finalMsg = 'CANDIDATO DESCARTADO: Rechazo humano explícito registrado.';
        renderLogs(logs, finalState, finalMsg);
        return;
      } else {
        logs.push({
          step: '07. R4 [⚙ DISEÑO]',
          text: `El organizador autorizó a ${candidateName}. Se registra la autorización (decisión Nº 12) y el caso pasa a R3.`
        });
        pasaAR3 = true;
      }
    }

    // ==========================================
    // ETAPA 2: EVALUACIÓN DE R3 (SOLICITUD DE ENVÍO)
    // ==========================================
    if (pasaAR3) {
      logs.push({
        step: '08. INICIO R3',
        text: `Se inicia evaluación de Frase 1 (R3). Condición 1 de 4 (Autorizado) ya está cumplida.`
      });

      logs.push({
        step: '09. R3 · CONDICIÓN 2 DE 4',
        text: `Revisando compatibilidad actualizada de ${candidateName}: ¿Sigue siendo compatible (horario/zona/nivel)? → <strong>${compatible ? 'SÍ' : 'NO'}</strong>.`
      });

      if (!compatible) {
        logs.push({
          step: '10. R3 [⚙ DISEÑO]',
          text: `Falló la condición de compatibilidad. Según decisión Nº 8, se registra la causal ("incompatible") y NO se envía la invitación.`
        });
        finalState = 'blocked';
        finalMsg = 'ENVÍO CANCELADO: El candidato ya no es compatible con el partido.';
        renderLogs(logs, finalState, finalMsg);
        return;
      }

      logs.push({
        step: '10. R3 · CONDICIÓN 3 DE 4',
        text: `Revisando cupo actualizado: ¿Todavía faltan jugadores? → <strong>${faltan ? 'SÍ' : 'NO'}</strong>.`
      });

      if (!faltan) {
        logs.push({
          step: '11. R3 [⚙ DISEÑO]',
          text: `Falló la condición de cupo. El cupo se llenó antes de despachar. Se registra "partido completo" y NO se envía la invitación.`
        });
        finalState = 'blocked';
        finalMsg = 'ENVÍO CANCELADO: El partido se completó mientras se procesaba.';
        renderLogs(logs, finalState, finalMsg);
        return;
      }

      logs.push({
        step: '11. R3 · CONDICIÓN 4 DE 4',
        text: `¿Ya hay una invitación vigente para ${candidateName} en este partido? → <strong>${invVigente ? 'SÍ (ya invitado y no respondió)' : 'NO (sin invitación previa)'}</strong>.`
      });

      if (invVigente) {
        logs.push({
          step: '12. R3 [⚙ DISEÑO]',
          text: `El candidato ya posee una invitación en curso. Para evitar spam y según decisión Nº 6 y 8, se registra "invitación vigente existente" y NO se reenvía.`
        });
        finalState = 'blocked';
        finalMsg = 'ENVÍO CANCELADO: Ya existe una invitación vigente para este jugador.';
        renderLogs(logs, finalState, finalMsg);
        return;
      }

      // ==========================================
      // ÉXITO: 4 DE 4 CONDICIONES CUMPLIDAS
      // ==========================================
      logs.push({
        step: '12. ACCIÓN FINAL R3',
        text: `<strong>¡Las 4 condiciones se cumplen simultáneamente!</strong> El sistema solicita enviar la invitación a ${candidateName}.`
      });

      logs.push({
        step: '13. RESULTADO [⚙ DISEÑO]',
        text: `Solicitud de envío emitida a la función de mensajería de la aplicación Matchdeverdad. La invitación llega al smartphone de ${candidateName}.`
      });

      finalState = 'success';
      finalMsg = `¡ÉXITO TOTAL! Invitación enviada exitosamente a ${candidateName}.`;
      renderLogs(logs, finalState, finalMsg);
    }
  }

  function renderLogs(logs, state, resultMsg) {
    if (!consoleOutput) return;

    let html = '';
    logs.forEach(log => {
      html += `
        <div class="sim-log-item">
          <span class="sim-log-step">[${log.step}]</span>
          <span class="sim-log-text">${log.text}</span>
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
        statusBadge.textContent = 'ESTADO: ÉXITO';
        statusBadge.style.background = '#059669';
        statusBadge.style.color = '#ffffff';
      } else if (state === 'blocked') {
        statusBadge.textContent = 'ESTADO: DETENIDO / CONDICIÓN FALLIDA';
        statusBadge.style.background = '#e11d48';
        statusBadge.style.color = '#ffffff';
      } else {
        statusBadge.textContent = 'ESTADO: EN ESPERA HUMANA';
        statusBadge.style.background = '#d97706';
        statusBadge.style.color = '#ffffff';
      }
    }
  }

  // Run default on load
  runSimulationWithParams('Lucas');
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
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}
