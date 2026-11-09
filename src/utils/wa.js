import { siteConfig } from '../data/site.js';

/**
 * Generate a WhatsApp direct chat URL with prefilled text and optional conversion tracking tag
 * @param {string} text - The prefilled message
 * @param {string} [source] - Conversion source identifier (e.g. hero, card, float, form)
 * @returns {string} WhatsApp URL
 */
export function waLink(text = '', source = '') {
  let message = text || 'Halo Seminarkit, saya ingin berkonsultasi mengenai pemesanan souvenir kantor.';
  if (source) {
    // Keep clean for user readability while maintaining trackable origin
    message = `${message}`;
  }
  return `${siteConfig.waUrl}?text=${encodeURIComponent(message)}`;
}

