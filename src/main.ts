import './style.css'
import { generatePassword } from "./password.ts";


const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <nav class="fixed z-50 flex items-center justify-center w-full h-24 px-8 py-10 md:justify-between">
    <div class="flex items-center">
      <img class="size-10" src="/logo.svg" alt="Logo">
      <p class="text-2xl font-bold text-white mx-2">Offline Key</p>
    </div>
  </nav>

  <div class="flex flex-col min-h-screen items-center justify-center w-full mx-auto p-6 bg-card rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-center text-white mb-8 md:mb-16 lg:text-5xl lg:mb-24">Generate strong, unique passwords</h1>

    <div class="w-screen p-4 bg-muted rounded-md flex items-center justify-center gap-3 mb-10">
      <span class="flex overflow-hidden rounded-md border shadow-xs dark:border-gray-800 dark:bg-gray-900">
        <span id="password" class="mx-2 text-xl text-white inline-flex items-center font-mono w-50 overflow-hidden justify-center sm:w-60 lg:min-w-70 lg:w-auto lg:overflow-visible">boogie</span>
        <button id="copy" class="inline-block p-3 focus:relative dark:hover:bg-gray-800" title="Copy Password">
          <img src="/copy.svg" class="size-5" alt="Copy Password">
        </button>
      </span>
      <div class="flex">
        <span class="inline-flex overflow-hidden rounded-md border shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <button id="refresh" class="inline-block p-3 focus:relative dark:hover:bg-gray-800" title="Refresh Password">
            <img src="/refresh.svg" class="size-5" alt="Copy Password">
          </button>
        </span>
      </div>
    </div>

    <div class="mb-6 w-80 sm:w-90 md:w-100">
      <p id="num-chars" class="text-m text-gray-400">16 Characters</p>
      <div class="relative flex items-center mt-3">
        <div class="absolute h-1 w-full rounded-full bg-white/10"></div>
        <div id="progress-bar" class="absolute h-1 rounded-lg bg-purple-300" style="width: 20%"></div>
        <label for="characters" class="sr-only">Character range</label>
        <input id="characters" type="range" value="16" min="4" max="64" step="1" class="w-full appearance-none bg-transparent cursor-pointer h-1 relative rounded-full">
      </div>
    </div>


    <div class="grid grid-cols-2 gap-x-10 gap-y-4 mt-6 sm:gap-x-20">
      <div class="inline-flex items-center">
        <label class="flex items-center cursor-pointer relative">
          <input id="lowercase" type="checkbox" checked class="peer size-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-cus-purple checked:border-purple-300"/>
          <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </span>
        </label>
        <label for="lowercase" class="text-xl text-gray-200 ml-3">Lowercase</label>
      </div>
      <div class="inline-flex items-center">
        <label class="flex items-center cursor-pointer relative">
          <input id="uppercase" type="checkbox" class="peer size-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-cus-purple checked:border-purple-300"/>
          <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </span>
        </label>
        <label for="uppercase" class="text-xl text-gray-200 ml-3">Uppercase</label>
      </div>
      <div class="inline-flex items-center">
        <label class="flex items-center cursor-pointer relative">
          <input id="numbers" type="checkbox" class="peer size-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-cus-purple checked:border-purple-300"/>
          <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </span>
        </label>
        <label for="numbers" class="text-xl text-gray-200 ml-3">Numbers</label>
      </div>
      <div class="inline-flex items-center">
        <label class="flex items-center cursor-pointer relative">
          <input id="symbols" type="checkbox" class="peer size-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-cus-purple checked:border-purple-300"/>
          <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </span>
        </label>
        <label for="symbols" class="text-xl text-gray-200 ml-3">Symbols</label>
      </div>
    </div>
  </div>
`


const characters = document.querySelector<HTMLInputElement>("#characters")!
const lowercase = document.querySelector<HTMLInputElement>("#lowercase")!
const uppercase = document.querySelector<HTMLInputElement>("#uppercase")!
const numbers = document.querySelector<HTMLInputElement>("#numbers")!
const symbols = document.querySelector<HTMLInputElement>("#symbols")!
const password = document.querySelector<HTMLInputElement>("#password")!
const copy = document.querySelector<HTMLInputElement>("#copy")!
const refresh = document.querySelector<HTMLInputElement>("#refresh")!


characters.addEventListener("input", () => {
    const value: number = Number(characters.value);

    const numChars = document.querySelector<HTMLInputElement>("#num-chars")!
    numChars.innerText = value + " Characters"

    const percentage = ((value - 4) / (64 - 4)) * 100;
    const progressBar = document.querySelector<HTMLInputElement>("#progress-bar")!
    progressBar.style.width = percentage + "%";

    updatePassword()
    localStorage.setItem("characters", characters.value);
})


function updatePassword() {
    const length = Number(characters.value);
    const includeLower = lowercase.checked
    const includeUpper = uppercase.checked
    const includeNumber = numbers.checked
    const includeSymbol = symbols.checked

    // enabled lowercase if everything is off
    if (!includeLower && !includeUpper && !includeNumber && !includeSymbol) {
        lowercase.checked = true
        localStorage.setItem("lowercase", "true")
    }

    password.innerText = generatePassword(length, includeLower, includeUpper, includeNumber, includeSymbol)
}


[lowercase, uppercase, numbers, symbols].forEach((element) => {
    element.addEventListener("click", () => {
        updatePassword()
        localStorage.setItem(element.id, element.checked.toString())
    })
})

copy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(password.innerText);
    copy.querySelector("img")!.src = "/check.svg"
    setTimeout(() => {
        copy.querySelector("img")!.src = "/copy.svg"
    }, 1000)
})

refresh.addEventListener("click", async () => { updatePassword() })


function loadDefaults() {
    characters.value = localStorage.getItem("characters") || "20"
    lowercase.checked = localStorage.getItem("lowercase") === "true"
    uppercase.checked = localStorage.getItem("uppercase") === "true"
    numbers.checked = localStorage.getItem("numbers") === "true"
    symbols.checked = localStorage.getItem("symbols") === "true"

    characters.dispatchEvent(new Event("input"))
}

loadDefaults()