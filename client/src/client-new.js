import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
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
        <paper-input 
          label="Title" 
          value="{{message.Title}}"
          char-counter
          maxlength="50"
          required>
        </paper-input>
        <paper-textarea label="Body" value="{{message.Body}}"></paper-textarea>

        <div class="buttons">
          <paper-button on-tap="abort">Abort</paper-button>
          <paper-button on-tap="submit">Submit</paper-button>
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

  abort() {
    window.history.pushState({}, null, ClientGlobals.rootPath + 'list');
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  submit(e) {
    console.log("Submit");
  }
}

window.customElements.define('client-new', ClientNew);
