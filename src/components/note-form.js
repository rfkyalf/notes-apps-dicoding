class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <style>
          .form-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 1em;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          input, textarea {
            padding: 0.5em;
            border: 1px solid #ddd;
            border-radius: 5px;
            width: 100%;
          }
          button {
            padding: 0.5em;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #fff;
            cursor: pointer;
          }
          button:hover {
            background-color: #0056b3;
          }
          .error {
            color: red;
            font-size: 0.9em;
          }
        </style>
        <div class="form-container">
          <input type="text" id="title" placeholder="Title" required />
          <textarea id="body" placeholder="Body" required></textarea>
          <button id="add-note">Add Note</button>
          <div id="error-message" class="error"></div>
        </div>
      `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#add-note').addEventListener('click', () => {
      const title = this.shadowRoot.querySelector('#title').value.trim();
      const body = this.shadowRoot.querySelector('#body').value.trim();
      const errorMessage = this.shadowRoot.querySelector('#error-message');

      if (title === '' || body === '') {
        errorMessage.textContent = 'Both title and body are required.';
        return;
      }

      errorMessage.textContent = '';

      const note = {
        title,
        body,
        createdAt: new Date().toISOString(),
      };

      const notes = JSON.parse(localStorage.getItem('notes') || '[]');
      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));

      this.shadowRoot.querySelector('#title').value = '';
      this.shadowRoot.querySelector('#body').value = '';

      const event = new CustomEvent('notes-updated', {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    });
  }
}

customElements.define('note-form', NoteForm);
