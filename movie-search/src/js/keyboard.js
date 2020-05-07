/* eslint-disable import/prefer-default-export */




const CODE = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
const EN = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&uarr;', 'Shift',
  'Ctrl', 'Rus/En', 'Alt', 'Space', 'Alt', '&larr;', '&darr;', '&rarr;', 'Ctrl',
];
const EN_CAPS = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
  'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del',
  'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
  'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '&uarr;', 'Shift',
  'Ctrl', 'Rus/En', 'Alt', 'Space', 'Alt', '&larr;', '&darr;', '&rarr;', 'Ctrl',
];
const RUS = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&uarr;', 'Shift',
  'Ctrl', 'Rus/En', 'Alt', 'Space', 'Alt', '&larr;', '&darr;', '&rarr;', 'Ctrl',
];
const RUS_CAPS = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
  'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del',
  'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
  'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '&uarr;', 'Shift',
  'Ctrl', 'Rus/En', 'Alt', 'Space', 'Alt', '&larr;', '&darr;', '&rarr;', 'Ctrl',
];

export function creatDom(){
const wrapper = document.createElement('div');
wrapper.id = 'wrapper-keyboard';
wrapper.classList = 'block'
document.querySelector('.search').append(wrapper);

const keyboards = document.createElement('div');
keyboards.className = 'keyboard';
keyboards.id = 'keyboard';
wrapper.append(keyboards);


for (let i = 0;i <= 63;i += 1) {
  const keys = document.createElement('div');
  keys.classList.add('key');
  keys.id = 'key';
  keys.setAttribute('data-code', CODE[i]);
  keys.innerHTML = `<span class="print en lang-rus block" > ${RUS[i]} </span><span class="enCap hidden print lang-rus block">${RUS_CAPS[i]}</span><span class="print en lang-eng" > ${EN[i]} </span><span class="enCap hidden print lang-eng ">${EN_CAPS[i]}</span>`;
  keyboards.append(keys);
}
keyboards.children[13].classList.add('backspace');
keyboards.children[14].classList.add('tab');
keyboards.children[28].classList.add('del');
keyboards.children[29].classList.add('CapsLock');
keyboards.children[41].classList.add('Enter');
keyboards.children[42].classList.add('ShiftLeft');
keyboards.children[53].classList.add('ArrowUp');
keyboards.children[54].classList.add('ShiftRight');
keyboards.children[55].classList.add('ControlLeft');
keyboards.children[56].classList.add('Meta');
keyboards.children[57].classList.add('AltLeft');
keyboards.children[58].classList.add('Space');
keyboards.children[59].classList.add('AltRight');
keyboards.children[63].classList.add('ControlRight');
keyboards.children[60].classList.add('ArrowLeft');
keyboards.children[61].classList.add('ArrowDown');
keyboards.children[62].classList.add('ArrowRight');
}
creatDom()
const INPUT = document.getElementById('search');
function changeLang(){
  const langRus = document.querySelectorAll('.lang-rus');
  const langEn = document.querySelectorAll('.lang-eng');
  for(let i =0,j=0;i<langRus.length,j<langEn.length;i +=1,j +=1){
    langEn[j].classList.toggle('block')
    langRus[i].classList.toggle('block')
}
}
function caps() {
  const en = document.querySelectorAll('.en');
  for (let i = 0; i < en.length; i += 1) {
    if (en[i].innerText !== 'Tab'&& 
      en[i].innerText !== 'Alt'&&
      en[i].innerText !== 'Ctrl'&&
      en[i].innerText !== 'Space'&&
      en[i].innerText !== 'Enter'&&
      en[i].innerText !== 'CapsLock'&&
      en[i].innerText !== 'Backspace'&&
      en[i].innerText !== 'Del'&&
      en[i].innerText !== 'Shift'&&
      en[i].innerText !== 'Rus/En') {
      en[i].classList.toggle('key-style-upper');
    }
  }
}
function shift() {
  const en = document.querySelectorAll('.en');
  const enCap = document.querySelectorAll('.enCap');
  for (let i = 0, j = 0; i < en.length, j < enCap.length; i += 1, j += 1) {
    en[i].classList.toggle('hidden');
    enCap[i].classList.toggle('hidden');
  }
}

document.addEventListener('keydown', () => {
  INPUT.focus()
});


document.querySelectorAll(' .key ').forEach((element) => {
  element.onmousedown = function (event) {
    event.preventDefault();
    this.classList.toggle('press');
    const code = this.innerText;
    if (code === 'Shift') {
      shift();
    }
  };
});

document.querySelectorAll('.key ').forEach((element) => {
  element.onmouseout = function (event) {
    const code = this.innerText;
    if (!(code === 'CapsLock')) {
      event.target.classList.remove('press');
    }
  };
});

function moveLeftCaret() {
  INPUT.selectionEnd -= 1;
 INPUT.focus();
}

function moveRightCaret() {
  INPUT.selectionStart += 1;
  INPUT.focus();
}

document.querySelectorAll('.key ').forEach((element) => {
  element.onclick = function(event) {
    const code = this.innerText;
    if (code === 'CapsLock') {
      if (event.repeat) return;
      caps();
      this.classList.toggle('press');
    } else if (code === 'Backspace') {
      if(!(INPUT.selectionStart <= 0))
      INPUT.setRangeText('', INPUT.selectionStart - 1,INPUT.selectionStart, 'select');
    } else if (code === 'CapsLock' || code === 'Shift' || code === 'Alt' || code === 'Ctrl'|| code === '↓'|| code === '↑' ) {
      return false;
    } else if (code === 'Space') {
      INPUT.setRangeText(' ', INPUT.selectionStart, INPUT.selectionEnd, 'end');
    } else if (code === 'Enter') {
      
      event.target.classList.remove('press');
      document.getElementById('wrapper-keyboard').classList.add('block')
    } else if (code === 'Del') {
      INPUT.setRangeText('', INPUT.selectionStart,INPUT.selectionStart + 1, 'select');
    } else if (code === 'Tab') {
      event.preventDefault();
      INPUT.setRangeText('\t', INPUT.selectionStart, INPUT.selectionEnd, 'end');
    }
    else if (code === 'Rus/En') {
      changeLang()
    } else if (code === '→') {
      moveRightCaret() 
    }else if (code === '←') {
      moveLeftCaret() 
    } else {
      INPUT.setRangeText(code, INPUT.selectionStart, INPUT.selectionEnd, 'end');
      
    }
  };
});





