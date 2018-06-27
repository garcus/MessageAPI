import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class Client404 extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
          display: block;
          padding: 10px;
        }
        .notfound {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: var(--disabled-text-color);
          font-size: 80px;
          font-weight: 700;
          padding-top: 100px;
        }
      </style>

      <div class="notfound">
        Resource<br/>Not found
      </div>
    `;
  }

  routeActivated() { }
}

window.customElements.define('client-404', Client404);
