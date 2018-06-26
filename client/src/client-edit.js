import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import './shared-styles.js';

class ClientEdit extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
          display: block;
          padding: 10px;
        }
        paper-progress {
          position: absolute;
          top: 0;
          width: 100%;
        }
      </style>

      <paper-progress indeterminate hidden$="[[!loading]]"></paper-progress>

      <iron-ajax id="ajax"
        headers="{'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': '*'}"
        content-type="application/json"
        on-response="handleResponse"
        loading="{{loading}}">
      </iron-ajax>

      <div class="card">
        <h2>Edit message</h2>
        <iron-form id="form">
          <form>
            <paper-input 
              label="Title" 
              value="{{message.title}}"
              char-counter
              error-message="This is a required field"
              maxlength="50"
              required>
            </paper-input>
            <paper-textarea label="Body" value="{{message.body}}"></paper-textarea>
          </form>
        </iron-form>
        <div class="buttons">
          <paper-button on-tap="abort">Abort</paper-button>
          <paper-button on-tap="save">Save</paper-button>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      messageId: String,
      message: Object,
      loading: {
        type: Boolean,
        value: false
      },
    };
  }

  routeActivated() {
    this.$.ajax.url = ClientGlobals.api + 'api/messages/' + this.messageId;
    this.$.ajax.generateRequest();
  }

  handleResponse(e) {
    this.set('message', e.detail.response);
  }

  save() {
    if(!this.$.form.validate()) { return; }
  }

  abort() {
    window.history.pushState({}, null, ClientGlobals.rootPath + 'list');
    window.dispatchEvent(new CustomEvent('location-changed'));
  }
}

window.customElements.define('client-edit', ClientEdit);
