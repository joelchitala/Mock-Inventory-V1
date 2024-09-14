export class InputTag extends HTMLElement {
    constructor() {
      super();
  
      const {type, hidden, id} = this.attributes
  
      if(hidden)this.style.display = "none"
  
      this.innerHTML = `
        <div class="input-container ${type?.value == "checkbox" ? "flex-row align-center" : "flex-col"}">
          <label></label>
          <input ${id? `id=${id.value}-input`: ""} type="${type ? type.value : "text"}">
        </div>
      `;
    }
  
    connectedCallback() {
  
      const {type, value} = this.attributes
  
      const labelElement = this.querySelector('label');
      const inputElement = this.querySelector('input');
  
      labelElement.textContent = this.getAttribute('label');
  
      inputElement.name = this.getAttribute('name');
      inputElement.id = this.getAttribute('name');
  
      const getBool = (text = "") =>{
        return text.toLowerCase() == "true" ? true : false
      }
      
      if (type?.value == "checkbox") {
        if(value){
          if (getBool(value.value)) {
            inputElement.checked = true
          }else{
            inputElement.removeAttribute("checked")
          }
        }
      }else if (type?.value == "date") {
        inputElement.value = value? value.value.replaceAll("-","/") : ""
      }else{
        inputElement.value = value? value.value : ""
      }
    }
  }
  
  customElements.define('input-tag', InputTag);