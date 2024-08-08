class NoteDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <style>
          .note-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            padding: 10px;
            background-color: #f9f9f9;
          }
  
          @media (max-width: 1200px) {
            .note-container {
              grid-template-columns: repeat(3, 1fr);
            }
          }
  
          @media (max-width: 900px) {
            .note-container {
              grid-template-columns: repeat(2, 1fr);
            }
          }
  
          @media (max-width: 600px) {
            .note-container {
              grid-template-columns: 1fr;
            }
          }
        </style>
        <div class="note-container"></div>
      `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const container = this.shadowRoot.querySelector('.note-container');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    container.innerHTML = '';
    notes.forEach((note) => {
      const noteItem = document.createElement('note-item');
      noteItem.setAttribute('title', note.title);
      noteItem.setAttribute('body', note.body);
      noteItem.setAttribute('createdAt', note.createdAt);
      container.appendChild(noteItem);
    });
  }
}

customElements.define('note-display', NoteDisplay);
