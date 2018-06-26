import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-progress/paper-progress.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/iron-ajax/iron-ajax.js';
import './client-icons.js';
import './shared-styles.js';

class ClientList extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        paper-fab {
          position: absolute;
          bottom: 32px;
          right: 32px;
        }
        paper-item {
          cursor: pointer;
        }
      </style>

      <paper-progress indeterminate hidden$="[[!loading]]"></paper-progress>

      <iron-ajax id="ajax"
        headers="{'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': '*'}"
        content-type="application/json"
        on-response="handleResponse"
        loading="{{loading}}">
      </iron-ajax>

      <paper-fab icon="client-icons:add" on-tap="newMsg"></paper-fab>

      <dom-repeat items="[[messages]]">
        <template>
          <paper-item on-tap="edit">
            <paper-item-body two-line>
              <div>[[item.title]]</div>
              <div secondary>[[item.body]]</div>
            </paper-item-body>
          </paper-item>
        </template>
      </dom-repeat>
    `;
  }

  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: false
      },
      messages: Array
    }
  }

  ready() {
    super.ready();
    this.$.ajax.url = ClientGlobals.api + 'api/messages';
    this.refresh();
  }

  routeActivated() { }

  refresh() {
    this.$.ajax.generateRequest();
  }

  handleResponse(e) {
    this.set('messages', e.detail.response);
  }

  newMsg() {
    window.history.pushState({}, null, ClientGlobals.rootPath + 'new');
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  edit(e) {
    window.history.pushState({}, null, ClientGlobals.rootPath + 'edit/' + e.model.item.id);
    window.dispatchEvent(new CustomEvent('location-changed'));
  }
}

window.customElements.define('client-list', ClientList);
