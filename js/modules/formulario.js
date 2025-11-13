/**
 * 📋 MÓDULO FORMULARIO CON EMAILJS
 * =================================
 * 
 * Maneja toda la funcionalidad del formulario de contacto
 * con integración de EmailJS para envío real de emails.
 */

import { $, $$, establecerTexto, agregarClase, quitarClase } from '../utils/dom.js';
import { validarEmail, noEstaVacio, tieneMinimo } from '../utils/validators.js';
import { sanitizar, log } from '../utils/helpers.js';

class Formulario {
  constructor() {
    this.formulario = $('#formulario-contacto') || document.querySelector('.contact-form');
    this.inputNombre = $('#nombre') || document.querySelector('input[type="text"]');
    this.inputEmail = $('#email') || document.querySelector('input[type="email"]');
    this.inputAsunto = $('#asunto') || document.querySelectorAll('input[type="text"]')[1];
    this.inputMensaje = $('#mensaje') || document.querySelector('textarea');
    this.btnEnviar = document.querySelector('.submit-button');
    this.errores = {};
    
    // Configuración de EmailJS (el usuario debe reemplazar estos valores)
    this.emailjsConfig = {
      serviceID: 'TU_SERVICE_ID',     // Cambiar por tu Service ID
      templateID: 'TU_TEMPLATE_ID',   // Cambiar por tu Template ID
      publicKey: 'TU_PUBLIC_KEY'      // Cambiar por tu Public Key
    };
    
    if (this.formulario) {
      this.init();
    } else {
      console.warn('⚠️ Formulario de contacto no encontrado');
    }
  }

  init() {
    // Inicializar EmailJS
    this.inicializarEmailJS();
    
    // Agregar eventos
    this.agregarEventosValidacion();
    this.manejarEnvio();
    
    log('📋 Formulario de contacto inicializado', 'info');
  }

  /**
   * Inicializa EmailJS con la clave pública
   */
  inicializarEmailJS() {
    if (typeof emailjs !== 'undefined') {
      try {
        emailjs.init(this.emailjsConfig.publicKey);
        log('✉️ EmailJS inicializado correctamente', 'success');
      } catch (error) {
        log('❌ Error al inicializar EmailJS: ' + error.message, 'error');
      }
    } else {
      log('⚠️ EmailJS no está cargado. Verifica que el script esté en el HTML', 'warning');
    }
  }

  /**
   * Agrega eventos de validación en tiempo real
   */
  agregarEventosValidacion() {
    if (this.inputNombre) {
      this.inputNombre.addEventListener('blur', () => this.validarNombre());
      this.inputNombre.addEventListener('input', () => this.limpiarError('nombre'));
    }

    if (this.inputEmail) {
      this.inputEmail.addEventListener('blur', () => this.validarEmail());
      this.inputEmail.addEventListener('input', () => this.limpiarError('email'));
    }

    if (this.inputAsunto) {
      this.inputAsunto.addEventListener('blur', () => this.validarAsunto());
      this.inputAsunto.addEventListener('input', () => this.limpiarError('asunto'));
    }

    if (this.inputMensaje) {
      this.inputMensaje.addEventListener('blur', () => this.validarMensaje());
      this.inputMensaje.addEventListener('input', () => this.limpiarError('mensaje'));
    }
  }

  /**
   * Valida el nombre
   * @returns {boolean}
   */
  validarNombre() {
    const nombre = this.inputNombre?.value || '';
    
    if (!noEstaVacio(nombre)) {
      this.mostrarError('nombre', 'El nombre es requerido');
      return false;
    }
    
    if (!tieneMinimo(nombre, 2)) {
      this.mostrarError('nombre', 'El nombre debe tener al menos 2 caracteres');
      return false;
    }
    
    this.limpiarError('nombre');
    return true;
  }

  /**
   * Valida el email
   * @returns {boolean}
   */
  validarEmail() {
    const email = this.inputEmail?.value || '';
    
    if (!noEstaVacio(email)) {
      this.mostrarError('email', 'El email es requerido');
      return false;
    }
    
    if (!validarEmail(email)) {
      this.mostrarError('email', 'Email inválido');
      return false;
    }
    
    this.limpiarError('email');
    return true;
  }

  /**
   * Valida el asunto
   * @returns {boolean}
   */
  validarAsunto() {
    const asunto = this.inputAsunto?.value || '';
    
    if (!noEstaVacio(asunto)) {
      this.mostrarError('asunto', 'El asunto es requerido');
      return false;
    }
    
    if (!tieneMinimo(asunto, 5)) {
      this.mostrarError('asunto', 'El asunto debe tener al menos 5 caracteres');
      return false;
    }
    
    this.limpiarError('asunto');
    return true;
  }

  /**
   * Valida el mensaje
   * @returns {boolean}
   */
  validarMensaje() {
    const mensaje = this.inputMensaje?.value || '';
    
    if (!noEstaVacio(mensaje)) {
      this.mostrarError('mensaje', 'El mensaje es requerido');
      return false;
    }
    
    if (!tieneMinimo(mensaje, 10)) {
      this.mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
      return false;
    }
    
    this.limpiarError('mensaje');
    return true;
  }

  /**
   * Valida el formulario completo
   * @returns {boolean}
   */
  validarFormularioCompleto() {
    const nombreValido = this.validarNombre();
    const emailValido = this.validarEmail();
    const asuntoValido = this.validarAsunto();
    const mensajeValido = this.validarMensaje();
    
    return nombreValido && emailValido && asuntoValido && mensajeValido;
  }

  /**
   * Muestra un error en un campo
   * @param {string} campo - Nombre del campo
   * @param {string} mensaje - Mensaje de error
   */
  mostrarError(campo, mensaje) {
    const input = document.querySelector(`#${campo}`);
    if (input) {
      this.errores[campo] = mensaje;
      agregarClase(input, 'error');
      
      let errorElement = input.parentElement.querySelector('.error-message');
      if (!errorElement) {
        errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        input.parentElement.appendChild(errorElement);
      }
      establecerTexto(errorElement, mensaje);
    }
  }

  /**
   * Limpia el error de un campo
   * @param {string} campo - Nombre del campo
   */
  limpiarError(campo) {
    const input = document.querySelector(`#${campo}`);
    if (input) {
      delete this.errores[campo];
      quitarClase(input, 'error');
      
      const errorElement = input.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
    }
  }

  /**
   * Obtiene los datos del formulario
   * @returns {Object}
   */
  obtenerDatos() {
    return {
      from_name: sanitizar(this.inputNombre?.value || ''),
      from_email: sanitizar(this.inputEmail?.value || ''),
      subject: sanitizar(this.inputAsunto?.value || ''),
      message: sanitizar(this.inputMensaje?.value || ''),
    };
  }

  /**
   * Reinicia el formulario
   */
  reiniciar() {
    if (this.formulario) {
      this.formulario.reset();
      this.errores = {};
      
      const inputs = $$('input, textarea', this.formulario);
      inputs.forEach(input => {
        quitarClase(input, 'error');
        const errorElement = input.parentElement?.querySelector('.error-message');
        if (errorElement) {
          errorElement.remove();
        }
      });
    }
  }

  /**
   * Maneja el envío del formulario
   */
  manejarEnvio() {
    if (this.formulario) {
      this.formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!this.validarFormularioCompleto()) {
          log('❌ Hay errores en el formulario', 'warning');
          this.mostrarNotificacion('Por favor, corrige los errores en el formulario', 'error');
          return;
        }
        
        const datos = this.obtenerDatos();
        await this.enviarFormulario(datos);
      });
    }
  }

  /**
   * Envía el formulario usando EmailJS
   * @param {Object} datos - Datos del formulario
   */
  async enviarFormulario(datos) {
    // Verificar si EmailJS está configurado
    if (this.emailjsConfig.serviceID === 'TU_SERVICE_ID') {
      log('⚠️ EmailJS no está configurado. Por favor configura tus credenciales.', 'warning');
      this.mostrarNotificacion('⚠️ El formulario no está configurado. Contacta al administrador.', 'error');
      return;
    }

    try {
      // Cambiar botón a estado enviando
      if (this.btnEnviar) {
        this.btnEnviar.disabled = true;
        this.btnEnviar.textContent = 'Enviando...';
      }

      // Enviar email usando EmailJS
      if (typeof emailjs !== 'undefined') {
        const response = await emailjs.send(
          this.emailjsConfig.serviceID,
          this.emailjsConfig.templateID,
          datos
        );

        log('✅ Email enviado correctamente: ' + response.status, 'success');
        this.mostrarNotificacion('¡Mensaje enviado correctamente! 🎉 Te responderé pronto.', 'success');
        this.reiniciar();
      } else {
        throw new Error('EmailJS no está disponible');
      }

    } catch (error) {
      log('❌ Error al enviar email: ' + error.text || error.message, 'error');
      this.mostrarNotificacion('❌ Error al enviar el mensaje. Por favor, intenta de nuevo o contacta por email directo.', 'error');
    } finally {
      if (this.btnEnviar) {
        this.btnEnviar.disabled = false;
        this.btnEnviar.textContent = 'Enviar mensaje';
      }
    }
  }

  /**
   * Muestra una notificación
   * @param {string} mensaje - Mensaje a mostrar
   * @param {string} tipo - 'success' o 'error'
   */
  mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos de la notificación
    notificacion.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${tipo === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-weight: 500;
      max-width: 400px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notificacion);

    // Animar entrada
    setTimeout(() => {
      notificacion.style.opacity = '1';
      notificacion.style.transform = 'translateX(0)';
    }, 100);

    // Animar salida y remover
    setTimeout(() => {
      notificacion.style.opacity = '0';
      notificacion.style.transform = 'translateX(100%)';
      setTimeout(() => notificacion.remove(), 300);
    }, 5000);
  }
}

export default Formulario;
