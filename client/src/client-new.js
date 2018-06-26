import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import './shared-styles.js';

class ClientNew extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
          display: block;
          padding: 10px;
        }
      </style>


      <div class="card">
        <h2>Compose new message</h2>
        <iron-form id="form">
          <form>
            <paper-input 
              label="Title" 
              value="{{message.Title}}"
              char-counter
              maxlength="50"
              error-message="This is a required field"
              required>
            </paper-input>
            <paper-textarea label="Body" value="{{message.Body}}"></paper-textarea>
          </form>
        </iron-form>
        <div class="buttons">
          <paper-button on-tap="abort">Abort</paper-button>
          <paper-button on-tap="send">Send</paper-button>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      message: Object
    }
  }

  routeActivated() {
    this.set('message', { Title: '', Body: ''});
  }

  send() {
    if(!this.$.form.validate()) { return; }
  }

  abort() {
    window.history.pushState({}, null, ClientGlobals.rootPath + 'list');
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  submit(e) {
    console.log("Submit");
  }
}

window.customElements.define('client-new', ClientNew);
