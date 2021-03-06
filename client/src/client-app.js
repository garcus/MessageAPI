import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './client-icons.js';

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
        --primary-color:        #4CAF50;
        --secondary-color:      #388E3C;
        --dark-primary-color:       #388E3C;
        --default-primary-color:    #4CAF50;
        --light-primary-color:      #C8E6C9;
        --text-primary-color:       #FFFFFF;
        --accent-color:             #FF5722;
        --primary-background-color: #C8E6C9;
        --primary-text-color:       #212121;
        --secondary-text-color:     #757575;
        --disabled-text-color:      #BDBDBD;
        --divider-color:            #BDBDBD;
        display: block;
      }
      app-header {
        color: #fff;
        background-color: var(--primary-color);
      }
      app-toolbar iron-icon {
        padding: 8px;
      }
      .servertag {
        color: var(--light-primary-color);
        text-align: right;
        padding-right: 16px;
        font-size: 14px;
      }
    </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
      <app-route route="{{subroute}}" pattern="/:messageId" data="{{subrouteData}}"></app-route>

      <app-header reveals>
        <app-toolbar>
          <iron-icon hidden$="[[!_frontpage(page)]]" icon="client-icons:mail"></iron-icon>
          <paper-icon-button hidden$="[[_frontpage(page)]]" icon="client-icons:arrow-back" on-tap="goHome"></paper-icon-button>
          <div main-title="">Messages</div>
          <div bottom-item class="servertag">Message server: [[messageServer]]</div>
        </app-toolbar>
      </app-header>

      <iron-pages selected="[[page]]" attr-for-selected="id" role="main">
        <client-list id="list"></client-list>
        <client-new id="new" on-refresh-list="refresh"></client-new>
        <client-edit id="edit" 
          message-id="[[subrouteData.messageId]]" 
          on-message-error="error"
          on-refresh-list="refresh">
        </client-edit>
        <client-404 id="404"></client-404>
      </iron-pages>
      <paper-toast id="toast" text="[[toastMsg]]"></paper-toast>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      subroute: Object,
      routeData: Object,
      subrouteData: Object,
      toastMsg: String,
      messageServer: String
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  ready() {
    super.ready();
    this.set('messageServer', window.ClientGlobals.api);
  }

  goHome() {
    window.history.pushState({}, null, ClientGlobals.rootPath + 'list');
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  openToast(msg) {
    if (typeof(msg) !== 'undefined') {
      this.set('toastMsg', msg);
      this.$.toast.open();
    }
  }

  /*
   * Page navigation monitors
   */
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
        importPromise = import('./client-edit.js');
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
  }

  /* 
   *Event handlers
   */
  refresh(e) {
    this.$.list.refresh();
    this.openToast(e.detail.message);
  }

  error(e) {
    this.openToast(e.detail.message);
  }

  _frontpage(page) {
    return (page === '' || page === 'list');
  }
}

window.customElements.define('client-app', ClientApp);
