class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const createdAt = new Date(
      this.getAttribute('createdAt')
    ).toLocaleDateString();

    this.shadowRoot.innerHTML = `
      <style>
        .note {
          border: 1px solid #ddd;
          padding: 1em;
          margin: 0.5em 0;
          border-radius: 5px;
          height: 100px;
          width: 300px;
        }
        .note-title {
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .note-body {
          margin-bottom: 0.5em;
        }
        .note-createdAt {
          font-size: 0.8em;
          color: #555;
        }
      </style>
      <div class="note">
        <div class="note-title">${title}</div>
        <div class="note-body">${body}</div>
        <div class="note-createdAt">Created at: ${createdAt}</div>
      </div>
    `;
  }
}

customElements.define('note-item', NoteItem);
