import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      paper-progress {
        position: relative;
        top: 0;
        width: 100%;
      }

      .card {
        margin: 24px;
        padding: 16px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      .card-header {
        align-content: center;
        align-items: center;
        justify-content: middle;
        width: 100%;
        display: flex;
        flex-direction: row;
      }

      .card-header h2 {
        flex-grow: 1;
      }

      .buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 100%;
      }
      paper-button[raised] {
        background-color: var(--accent-color);
        color: white !important;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
