import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/iron-pages/iron-pages.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(ClientGlobals.rootPath);

/**
 * @customElement
 * @polymer
 */
class ClientApp extends PolymerElement {
  static get template() {
    return html`
      <style>
      :host {
        --app-primary-color: #f49242;
        --app-secondary-color: black;
        display: block;
      }
      app-header {
        color: #fff;
        background-color: var(--app-primary-color);
      }
      paper-fab {
        position: absolute;
        top: 32px;
        right: 32px;
      }
    </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
      <app-route route="{{subroute}}" pattern="/:messageId" data="{{subrouteData}}"></app-route>

      <app-header reveals>
        <app-toolbar>
          <div main-title="">Message client</div>
        </app-toolbar>
      </app-header>

      <iron-pages selected="[[page]]" attr-for-selected="id" role="main">
        <client-list id="list" on-new-message="new" on-edit-message="edit"></client-list>
        <client-new id="new" name="new"></client-new>
        <client-edit id="edit" message-id="[[subrouteData.messageId]]"></client-edit>
      </iron-pages>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      messageId: String,
      routeData: Object,
      subrouteData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }
  _routePageChanged(page) {
    if (!page) {
      this.page = 'list';
    } else if (['list', 'edit', 'new'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = '404';
    }
  }

  _pageChanged(page) {
    var _this = this;
    var importPromise = null;
    switch (page) {
      case 'list':
        importPromise = import('./client-list.js');
        break;
      case 'edit':
        importPromise = import('./client-edit');
        break;
      case 'new':
        importPromise = import('./client-new.js');
        break;
      case '404':
        import('./client-404.js');
        break;
    }
    if (importPromise !== null) {
      importPromise.then(function() {
        _this.$[page].routeActivated();
      });
    }
    // window.history.pushState({}, null, [ClientGlobals.rootPath, page, this.messageId].join('/'));
    // window.dispatchEvent(new CustomEvent('location-changed'));
  }

  newMsg() {
    this.set('page', 'new');
  }

  editMsg(e) {

  }
}

window.customElements.define('client-app', ClientApp);
